const name = 'John';
const age = 31;
const job = 'web developer';
const city = 'Miami';
let html;
html = `
<ul>
    <li>Name: ${name}</li>
    <li>Age: ${age}</li>
    <li>Job: ${job}</li>
    <li>City: ${city}</li>
    <li>City: ${2+2}</li>

</ul>
`;
document.body.innerHTML = html;
