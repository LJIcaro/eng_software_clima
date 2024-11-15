const description = document.querySelector(".tooltip");

document.querySelectorAll('path').forEach((el) => {
	el.addEventListener('mouseover', (event) => {
		event.target.className = ("enabled");
		description.classList.add("active");
		description.innerHTML = event.target.id;
	});

	el.addEventListener('mouseout', () => {
		description.classList.remove("active");
	});

	el.addEventListener('click', (event) => {
	   console.log(event.target.id);
       const Div1 = document.querySelector('.coordinates');
       const meuid = '#'+ event.target.id
       const coordinatesDiv = document.querySelector(meuid);
       const latitude = coordinatesDiv.getAttribute('data-lat');
       const longitude = coordinatesDiv.getAttribute('data-long');
       console.log("Latitude da Capital = " + latitude);
       console.log("Longitude da Capital = " + longitude);
	   const apiUrl = 'https://eng-software-clima.onrender.com/' + latitude + '/' + longitude;
       buscarDados(apiUrl);
	});


});

document.onmousemove = function (e) {
	description.style.left = e.pageX + "px";
	description.style.top = (e.pageY - 70) + "px";
};

function mostrarCard(estado) {
	var card = document.getElementById('card');
	var titleInfo = document.getElementById('titleInfo')
	titleInfo.innerHTML = 'Informações climáticas sobre: <br> ' + estado;
	
    card.style.display = 'block';
	setTimeout(mostrargrafico, 500);
	
}

function mostrargrafico(){
	var grafico = document.getElementById('grafico');
	grafico.style.display = 'block';
	grafico.innerHTML = '<iframe loading="lazy" src="qualidade_do_ar2.html" width="600" height="350"></iframe>';
    
	
}

function redirectTo(url) {
    window.location.href = url;
}





async function buscarDados(apiUrl) {
	try {
		let response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error('Erro na solicitação: ' + response.status);
		}
		let data = await response.json();
		estadoInfo.innerHTML = data.message
		temperaturaInfo.innerHTML = data.temperatura
		tempoInfo.innerHTML = data.tempo
		descricaoInfo.innerHTML = data.descricao
		temp_min.innerHTML = `Min ${data.temp_min}`
		temp_max.innerHTML = `Max ${data.temp_max}`
		console.log(data.hora)
		
	} catch (error) {
	alert(error)
	}
}

