const data = [
    { slNo: 1, title: "Portfolio", link: "https://www.rocktimsharma.me/" },
    { slNo: 2, title: "Aarohan ITI", link: "https://aarohaniti.online/" },
    { slNo: 3, title: "Cake Bake", link: "https://junalicake.000webhostapp.com/" },
    { slNo: 4, title: "Match Parenthesis", link: "https://rocktimsharma.github.io/projects/html/match-parenthesis.html" }
];

// Function to create table rows dynamically
function createTableRows() {
    const tbody = document.getElementById('table').getElementsByTagName('tbody')[0];

    data.forEach((item) => {
        const row = tbody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.innerHTML = item.slNo;
        cell2.innerHTML = item.title;
        cell3.innerHTML = `<a href="${item.link}">${item.link}</a>`;
    });
}


document.addEventListener("DOMContentLoaded",function(){
    createTableRows();
})