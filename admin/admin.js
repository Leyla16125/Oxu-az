const formcontainer = document.getElementById('formContainer');
const table = document.querySelector('table');
const form = document.querySelector('form');
const data = []
const tbl = document.getElementById('tbl')

function toggleForm() {
    formcontainer.classList.toggle("hidden");
    formcontainer.classList.toggle("flex");
}

// function addNEW() {
//     const title = document.getElementById("title").value;
//     const content = document.getElementById("content").value;
//     const date = document.getElementById("date").value;
//     const views = document.getElementById("views").value;

//         table.innerHTML += `
//             <tr>
//                 <td>${title}</td>
//                 <td>${content}</td>
//                 <td>${date}</td>
//                 <td>${views}</td>
//                 <td>
//                     <i class="fa-solid fa-trash" style="color:red; cursor:pointer;" onclick="deleteRow(id)"></i>
//                 </td>
//             </tr>
//         `;

//         toggleForm();
//         form.reset();
    
// }


function getAllNews()  {
    fetch("https://6806d6eae81df7060eb83387.mockapi.io/oxuaz")
    .then( res => res.json())
    .then( mel =>{
        data.length = 0
        data.push(...mel)
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
        </tr>
        `
    })
}
function deleteRow(id) {
    fetch(`https://6806d6eae81df7060eb83387.mockapi.io/oxuaz${id}`,{
        method : 'delete?'
    })
    .then(res => res.json() )
     .then( mel => {
        alert("deleted")
        const yeniData = data.filter(item => item.id != id)
        data.length = 0
        data.push(...yeniData)
        show()
    } )
}


function addNews() {
    fetch(`https://6806d6eae81df7060eb83387.mockapi.io/oxuaz`,{
        method : 'POST',
        body: JSON.stringify(
            {
                title: "Ucarda zəncirvari qəza: Xəsarət alanlar var",
                img: "https://images.oxu.az/2025/04/13/HWSDb9RikwNw3Sjp59HoLTNhSxH8Iv5NBToHCJbE:1200.jpg",
                view: "744",
                description: "<p>Ucarda zəncirvari qəza olub, 4 nəfər xəsarət alıb.</p>\n<p><strong>Oxu.Az&nbsp;</strong>Bizim.Media-ya istinadən xəbər verir ki, hadisə rayonun H.Əliyev prospektində baş verib.</p>\n<p>Belə ki, prospektdə hərəkətdə olan VAZ-2106, VAZ-2107 və \"Ford\" markalı avtomobillərin toqquşması nəticəsində Ucar rayon sakinləri, 46 yaşlı G&uuml;lbəniz Eldar qızı Seyfullayeva, bacısı, 53 yaşlı Aybəniz Eldar qızı Məmmədova, 27 yaşlı H&uuml;seyn Bəxtiyar oğlu Xəlilov və G&ouml;y&ccedil;ay rayon sakini, 61 yaşlı İntizam Kərim oğlu İsmayılov m&uuml;xtəlif xəsarətlərlə Ucar Rayon Mərkəzi Xəstəxanasına yerləşdiriliblər.</p>\n<p>Faktla bağlı araşdırma aparılır.</p>",
                date: "2025-04-13",
                is_popular: true,

            }
        ),
        headers:{
            'Content-type':'application/json; charset=UTF-8',
        }
    })
    .then( res => res.json())
    .then( mel =>{
        getAllNews()
    } )
}