
const pokemonNome = document.querySelector('#nomePok');
const pokemonNumero = document.querySelector('#numeroPok');
const pokemonImagem = document.querySelector('.pokemonImg');

const pokemonformulario = document.querySelector('#formMain');
const pokemonInput = document.querySelector('#inputMain');

const pokemonProximo = document.querySelector('.proximo');
const pokemonVoltar = document.querySelector('.voltar');

let valorPokemon = 1;

const fetchPokemon = async (pokemon) => {
const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

if(APIResponse.status==200){

    const data = await APIResponse.json();
    return data;
    }
}


const renderPokemon = async (pokemon) => {
    pokemonNome.innerHTML = 'carregando.....';
    pokemonNumero.innerHTML = '';

    const data = await fetchPokemon
    (pokemon);
    if(data){
        pokemonNome.innerHTML = data.name;
        pokemonNumero.innerHTML = data.id;
        pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        valorPokemon = data.id;

        pokemonInput.value = '';
    } else{
        pokemonImagem.style.display = 'none';
        pokemonNome.innerHTML ='nome não encontrado';
        pokemonNumero.innerHTML = '';
    }
}

pokemonformulario.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(pokemonInput.value.toLowerCase());
    pokemonInput.value = '';    
})

renderPokemon(valorPokemon);

pokemonVoltar.addEventListener('click', () => {
    if(valorPokemon > 1) {
        valorPokemon -=1;
        renderPokemon(valorPokemon);    
    }
})

pokemonProximo.addEventListener('click', () => { 
    valorPokemon +=1;
    renderPokemon(valorPokemon);
  
})

