
const loadingElement = document.querySelector("#loading")
const postsContainer = document.querySelector("#posts-container")
const botao = document.querySelector("#botaoBuscar")
const url = "https://jsonplaceholder.typicode.com/posts"

//Pegar a url
const urlParamentros = new URLSearchParams(window.location.search)
const idPost = urlParamentros.get("id")
const comentariosContainer = document.querySelector("#comentarios-container")

const comentarioForm = document.querySelector("#comentario-form")
const emailinput = document.querySelector("#email")
const comentarioinput = document.querySelector("#tcomentario")

if(!idPost) {
    BuscarTodosPosts()
} else
{
    //Tratar aqui o metodo de gravar comentários e visualiazar detalhe do post
    console.log("o valor do idPost é" + idPost)
    BuscarTodosPosts(idPost)

    comentarioForm.addEventListener("submit", (e) => {
        e.preventDefault()

        let comentarioInserido = {
            email: emailinput.value,
            body: comentarioinput.value,
        }

        console.log("comentario antes do tratamento Json " + comentarioInserido)

        comentarioJson = JSON.stringify(comentarioInserido)
        console.log("comentario depois do tratamento Json" + comentarioInserido)
       postComentario(comentarioInserido)

    })
}


async function BuscarTodosPosts() {
    const resposta = await fetch(url)

    const data = await resposta.json()

    loadingElement.classList.add("hide")

    data.map((postagem) => {
        const div = document.createElement("div")
        const title = document.createElement("h2")
        const body = document.createElement("p")
        const link = document.createElement("a")

        title.innerText = postagem.title
        body.innerText = postagem.body
        link.innerText = "Ler" 
        link.setAttribute("href", '/post.hmtl?id=' + postagem.id)
        
        div.appendChild(title)
        div.appendChild(body)
        div.appendChild(link)
        postsContainer.appendChild(div)
    })

}

async function BuscaPostEspecifico(id) {
    //const respostaPost = await fetch('${url}/${id}') 
    //const respostaComentario = await fetch('${url}$/{id}/comments')

    const [respostaPost, respostaComentario] = await Promise.all ([
        fetch('${url}/${id}'),
        fetch('${url}/${id}/comments'),
    ])

    constdatapostagem = await respostaPost.json()
    const dataComentario = await respostaComentario.json()

    loadingElement.classList.add("hide")

    const title = document.createElement("h1")
    const body = document.createElement("p")

    title.innerText = dataPostagem.title
    body.innerText = dataPostagem.body

    postsContainer.appendChild(title)
    postsContainer.appendChild(body)

    dataComentario.map((comentario => {
        criarComentario(comentario)
    }))
}

function criarComentario(comentario) {
    const divComentario = document.crateElement("div")
    const email = document.createElement("h3")
    const paragrafocomentario = documento.crateElement("p")

    email.innerText = comentario.email
    paragrafocomentario.innerText = comentario.body
    
    divComentario.appendChild(email)
    divComentario.appendChild(paragrafocomentario)
    divComentario.appendChild(divComentario)
}
async function postComentario (comentario) {
    const resposta = await fetch(url, {
        method: "POST",
        body: comentario,
        headers: {
            "content-type": "application/json",
        }
    })
    const dataResposta = await resposta.json()

    criarComentario(dataResposta)
}