const containerDiv = document.getElementById('container');
const item1 = document.getElementById('item1');
const item2 = document.getElementById('item2');
const item3 = document.getElementById('item3');
const outsideParagraph = document.getElementById('outsideParagraph');

console.log('--- Demonstrating parentNode ---');
console.log('Parent of item1:', item1.parentNode);
console.log('Parent of outsideParagraph:', outsideParagraph.parentNode);

console.log('\n--- Demonstrating childNodes ---');
console.log('Children of containerDiv:', containerDiv.childNodes);

console.log('\n--- Demonstrating childNodes (filtered to elements) ---');
console.log('Element children of containerDiv:', Array.from(containerDiv.childNodes).filter(node => node.nodeType === Node.ELEMENT_NODE));

console.log('\n--- Demonstrating nextSibling ---');
console.log('Next sibling of item1:', item1.nextSibling);
console.log('Next sibling of item2:', item2.nextSibling);
console.log('Next sibling of item3:', item3.nextSibling);

console.log('\n--- Demonstrating nextElementSibling ---');
console.log('Next element sibling of item1:', item1.nextElementSibling);
console.log('Next element sibling of item2:', item2.nextElementSibling);
console.log('Next element sibling of item3:', item3.nextElementSibling);

console.log('\n--- Demonstrating previousSibling ---');
console.log('Previous sibling of item1:', item1.previousSibling);
console.log('Previous sibling of item2:', item2.previousSibling);
console.log('Previous sibling of item3:', item3.previousSibling);

console.log('\n--- End Of Demonstration ---');
