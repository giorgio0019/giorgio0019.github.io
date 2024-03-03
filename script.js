// function myParser(content)){
  
// }

document.addEventListener('DOMContentLoaded', function () {
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
          return `<div class="intestazione"><p>${segment.replace(/\n/g, '<br>')}</p></div>`;
        }
        // Layer Content
        else if (index % 2 === 0) {
          return `<div class="content"><p>${segment.replace(/\n/g, '<br>')}</p></div>`;
        }
        // È un nome di Layer
        else {
          layerNames.push(segment);
          return `<button type="button" class="collapsible highlight">(Layer: ${segment})</button><br>`;
        }
      });
      outputDiv.innerHTML = paragraphs.join('');
      // Find comments
      const comments = content.match(/(?<=M47\s).+/g);
      corpo = document.getElementsByTagName("body")[0];
      corpo.innerHTML = corpo.innerHTML.replace(/(M47.+)/g,"<span class=\"verde\">$1</span>");
      console.log(layerNames);
      comments.forEach(commento => console.log(commento))
      // Implementing folding
      const coll = document.getElementsByClassName("collapsible");
      for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
          }
        });
      }
      // Quante Passate?
      intestazione = document.getElementsByClassName("intestazione")[0];
      spessore = intestazione.innerHTML.match(/\d+(?=\s*mm)/);
      if (parseInt(spessore) > 7) {
        console.log("sono richeste due passate");
      }
      else {
        console.log("non sono richieste due passate");
      }
    };
    reader.readAsText(file);
  });
});