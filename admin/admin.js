const formcontainer = document.getElementById('formContainer');
const table = document.querySelector('table');
const form = document.querySelector('form');
const data = []
const tbl = document.getElementById('tbl')
const title = document.getElementById("title");
const content = document.getElementById("content");
const date = document.getElementById("date");
const views = document.getElementById("views");
const image = document.getElementById("image")
const btn = document.getElementById('btn')
const formContainer = document.getElementById('formContainer')


function toggleForm() {
    formcontainer.classList.toggle("hidden");
    formcontainer.classList.toggle("flex");
}


function getAllNews()  {
    fetch("https://6806d6eae81df7060eb83387.mockapi.io/oxuaz")
    .then( res => res.json())
    .then( mel =>{
        data.length = 0
        data.push(...mel.reverse())
        show()
    } )
}
getAllNews()

function show(){
    tbl.innerHTML = ''

    data.map(item =>{
        tbl.innerHTML +=
        `<tr>
            <td style="width: 100px; height: 100px; "><img src="${item.img}" style="width: 100%"/></td>
            <td>${item.title}</td>
            <td>${item.description.slice(0,200)}</td>
            <td>${item.date}</td>
            <td>${item.view}</td>
            <td><i class="fa-solid fa-trash" style="color:red; cursor:pointer;" onclick="deleteRow(${item.id})"></i></td>
            <td><i class="fa-solid fa-edit" style="color:green; cursor:pointer;" onclick="editNews(${item.id})"></i></td>
        </tr>
        `
    })
}
function deleteRow(id) {
    fetch(`https://6806d6eae81df7060eb83387.mockapi.io/oxuaz/${id}`, {
        method : 'DELETE'
    })
    .then(res => res.json())
    .then(mel => {
        alert("Xəbər silindi");
        getAllNews();
    })
}



// function addNews() {
//     fetch(`https://6806d6eae81df7060eb83387.mockapi.io/oxuaz`,{
//         method : 'POST',
//         body: JSON.stringify(
//             {
//                 title: "Ucarda zəncirvari qəza: Xəsarət alanlar var",
//                 img: "https://images.oxu.az/2025/04/13/HWSDb9RikwNw3Sjp59HoLTNhSxH8Iv5NBToHCJbE:1200.jpg",
//                 view: "744",
//                 description: "<p>Ucarda zəncirvari qəza olub, 4 nəfər xəsarət alıb.</p>\n<p><strong>Oxu.Az&nbsp;</strong>Bizim.Media-ya istinadən xəbər verir ki, hadisə rayonun H.Əliyev prospektində baş verib.</p>\n<p>Belə ki, prospektdə hərəkətdə olan VAZ-2106, VAZ-2107 və \"Ford\" markalı avtomobillərin toqquşması nəticəsində Ucar rayon sakinləri, 46 yaşlı G&uuml;lbəniz Eldar qızı Seyfullayeva, bacısı, 53 yaşlı Aybəniz Eldar qızı Məmmədova, 27 yaşlı H&uuml;seyn Bəxtiyar oğlu Xəlilov və G&ouml;y&ccedil;ay rayon sakini, 61 yaşlı İntizam Kərim oğlu İsmayılov m&uuml;xtəlif xəsarətlərlə Ucar Rayon Mərkəzi Xəstəxanasına yerləşdiriliblər.</p>\n<p>Faktla bağlı araşdırma aparılır.</p>",
//                 date: "2025-04-13",
//                 is_popular: true,

//             }
//         ),
//         headers:{
//             'Content-type':'application/json; charset=UTF-8',
//         }
//     })
//     .then( res => res.json())
//     .then( mel =>{
//         getAllNews()
//     } )
// }
function addNEW(){
    if(validation() == true) return;
    fetch("https://6806d6eae81df7060eb83387.mockapi.io/oxuaz",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: bdy()
        }).then(res => res.json())
        .then(info => {
            getAllNews()
            toggleForm() 
            // alert('Xeber elave olundu')
            clear()
    })
}
function clear(){
    form.querySelectorAll('input').forEach(item=>item.value='');
    content.value='';
}

function validation(){
    if(title.value.trim() == ""){
        title.style.borderColor = "red"
        alert("Başlıq əlavə et")
        return true
    }

    if(content.value.trim() == ""){
        content.style.borderColor = "red"
        alert("Mətn əlavə et")
        return true
    }


    if(image.value.trim() == ""){
        image.style.borderColor = "red"
        alert("Şəkil əlavə et")
        return true
    }

    if(views.value.trim() == ""){
        views.style.borderColor = "red"
        alert("Baxış sayı əlavə et")
        return true
    }
    if(date.value.trim() == ""){
        date.style.borderColor = "red"
        alert("Tarix əlavə et")
        return true
    }

    
    return false
}
function editFetchNews(id){
    if (validation()) return 

    fetch(`https://6806d6eae81df7060eb83387.mockapi.io/oxuaz/${id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json",},
        body: bdy()
    }).then(res => res.json())
      .then(info => {
        alert("melumata duzelis edildi")
        getAllNews();
        toggleForm();
        clear();


        btn.innerHTML ='Yüklə'
        btn.onclick = addNEW
      })
      
}
function editNews(id){
    toggleForm()
    btn.innerHTML = "Düzəliş et"
    btn.onclick = () => {
        editFetchNews(id)
    }

    const elem = data.find(item => item.id == id)
    console.log(elem)
    title.value = elem.title
    content.value = elem.description
    image.value = elem.title
    date.value = elem.title
    views.value = elem.title
}

function bdy(){
    return JSON.stringify({
        title: title.value,
        description: content.value,
        img : image.value,
        view: views.value,
        date: date.value
})
}