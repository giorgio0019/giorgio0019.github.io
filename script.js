const fileInput = document.getElementById('fileInput');
const outputDiv = document.getElementById('output');
let layerNames = [];
let comments = [];

fileInput.addEventListener('change', function () {
  const file = this.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const content = reader.result;
    // Layer folding      
    const paragraphs = content.split(/\(Layer:\s(.+)\)/g).map((segment, index) => {
      // Intestazione
      if (index === 0){
        return `<div class="intestazione card card-body">${segment.replace(/\n/g, '\n<br>')}</div>`;
      }
      // Layer Content
      else if (index % 2 === 0) {
        return `<div class="collapse" id="collapseExample${index-1}"><div class="card card-body">${segment.replace(/\n/g, '\n<br>')}</div></div>`;
      }
      // È un nome di Layer
      else {
        layerNames.push(segment);
        return `<div class="text-center"><a class="btn btn-primary collapsed mb-1"  data-bs-toggle="collapse" href="#collapseExample${index}" aria-expanded="false">(Layer: ${segment})</a></div><br>`;
      }
    });
    outputDiv.innerHTML = paragraphs.join('');
    console.log(outputDiv.innerHTML);
    // Find comments
    const comments = content.match(/(?<=M47\s).+/g);
    corpo = document.getElementsByTagName("body")[0];
    corpo.innerHTML = corpo.innerHTML.replace(/(M47.+)/g,"<span class=\"verde\">$1</span>");
    console.log(layerNames);
    comments.forEach(commento => console.log(commento))
    // Quante Passate?
    intestazione = document.getElementsByClassName("intestazione")[0];
    spessore = intestazione.innerHTML.match(/\d+(?=\s*mm)/);
    if (parseInt(spessore) > 7) {
      console.log("sono richeste due passate");
      const choice = window.confirm("Procedere in più passate?");
      if (choice) {
        console.log("Elaborazione passate");
        layer_content = document.getElementsByClassName("collapse");
        console.log(layer_content.length)
        for (let i = 0; i < layer_content.length; i++) {
          // ipotizzando massimo due passate da 4mm
          layer_content[i].innerHTML = layer_content[i].innerHTML.replace(/(.+)G82\n((?:.+coordinate\d+\n)*)(?=.+G82|<br>\n)/g,"$1G83K4.000\n$2$1G82 $2")
        }
      }
    }
    else {
      console.log("non sono richieste due passate");
    }
  };
  reader.readAsText(file);
});

document.getElementById("saveButton").addEventListener("click", function() {
  console.log("cliccato");
  const content = document.getElementById("output").innerText;
  const filename = "file_editato.txt";
  const blob = new Blob([content], { type: "text/plain" });

  // Create a temporary anchor element
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(blob);
  anchor.download = filename;

  // Programmatically trigger a click event to initiate the download
  anchor.click();

  // Clean up by revoking the object URL
  URL.revokeObjectURL(anchor.href);
});