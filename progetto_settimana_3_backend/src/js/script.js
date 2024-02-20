const apiPages = "http://localhost/wordpress/wp-json/wp/v2/pages";
fetch(apiPages)
    .then(res => res.json())
    .then(data => data.forEach(element => {
        CreateCard(element)
    }))
function CreateCard (element) {
    console.log(element)
}