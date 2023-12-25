async function exportCanvas() {
  const imageURL = canvas.toDataURL();
  console.log(imageURL);

  const apiRequest = await fetch("http://127.0.0.1:5000/recognize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image_data: imageURL }),
  });
  const response = await apiRequest.json();
  digit = response.predicted_digit;
  confidence = response.confidence_level;

  document.getElementById(
    "result_digit"
  ).innerHTML = `Predicited Digit: ${digit}`;
  document.getElementById(
    "result_confidence"
  ).innerHTML = `Confidence Level: ${confidence}%`;
}
