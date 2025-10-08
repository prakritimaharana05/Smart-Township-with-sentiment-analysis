function sendData() {
  const fileInput = document.getElementById("csvFile");
  const file = fileInput.files[0];
  if (!file) {
    alert("Please upload a CSV file first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = "<h3>Prediction Results:</h3>";
      data.forEach((row, idx) => {
        resultsDiv.innerHTML += `<p><strong>Row ${idx + 1}</strong> - ${row['Failure Prediction']} | ${row['Predicted Time to Failure (hrs)']} hrs</p>`;
      });
    })
    .catch(err => {
      alert("Error while predicting: " + err);
    });
}
 const csvInput = document.getElementById('csvFile');
  const fileLabelText = document.getElementById('fileLabelText');
  if (csvInput && fileLabelText) {
    csvInput.addEventListener('change', function() {
      fileLabelText.textContent = this.files[0] ? this.files[0].name : 'Choose CSV File';
    });
  }
  document.getElementById('faultForm').onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('predictionResult').innerHTML = 
      "<strong>Prediction Result:</strong><div>Sample: No Fault Detected</div>";
};
document.getElementById('issueType').addEventListener('change', function() {
  var predictiveSection = document.getElementById('predictiveSection');
  if (this.value === 'streetlight') {
    predictiveSection.style.display = 'block';
  } else {
    predictiveSection.style.display = 'none';
  }
});

document.getElementById('faultForm').onsubmit = function(e) {
    e.preventDefault();

    let temp = parseFloat(document.getElementById('temp').value);
    let vibration = parseFloat(document.getElementById('vibration').value);
    let usage = parseFloat(document.getElementById('usage').value);

    let resultText = "";
    let priority = "low";
    if (temp > 80 || vibration > 30) {
        resultText = "Seal Leakage predicted (High Priority)";
        priority = "high";
    } else if (temp > 50 || vibration > 10) {
        resultText = "Possible Overheating (Medium Priority)";
        priority = "medium";
    } else {
        resultText = "Normal Operation (Low Priority)";
        priority = "low";
    }

    document.getElementById('predictionResult').innerHTML =
      `<strong>Prediction Result:</strong><div>${resultText}</div>`;


    document.getElementById('priority').value = priority;
};
