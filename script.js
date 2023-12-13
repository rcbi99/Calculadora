// Función para calcular la hidratación basal usando el método de Holliday-Segar
function calcularHidratacionBasal(peso) {
    let volumenDiario = 0;
    if (peso <= 10) {
        volumenDiario = peso * 100;
    } else if (peso <= 20) {
        volumenDiario = 10 * 100 + (peso - 10) * 50;
    } else {
        volumenDiario = 10 * 100 + 10 * 50 + (peso - 20) * 20;
    }

    const mantenimiento = volumenDiario / 24;
    const mMasMitad = mantenimiento * 1.5;

    return {
        mantenimiento: mantenimiento.toFixed(2),
        mMasMitad: mMasMitad.toFixed(2)
    };
}

// Función para calcular la superficie corporal
function calcularSuperficieCorporal(peso) {
    const superficieCorporal = ((peso * 4) + 7) / (peso + 90);
    const volumenDiario1500 = superficieCorporal * 1500;
    const volumenDiario2000 = superficieCorporal * 2000;

    return {
        volumenDiario1500: volumenDiario1500.toFixed(2),
        volumenDiario2000: volumenDiario2000.toFixed(2)
    };
}

// Función para mostrar los resultados en el HTML
function mostrarResultados() {
    const pesoInput = document.getElementById('peso');
    const errorMensaje = document.getElementById('error');
    const fluResultado = document.getElementById('flu');
    const manResultado = document.getElementById('man');

    if (pesoInput.value !== '') {
        const peso = parseFloat(pesoInput.value);
        let resultados;
        if (peso <= 30) {
            resultados = calcularHidratacionBasal(peso);
            fluResultado.textContent = resultados.mantenimiento + ' cc/h';
            manResultado.textContent = 'm+m/2 : ' + resultados.mMasMitad + ' cc/h';
        } else {
            resultados = calcularSuperficieCorporal(peso);
            fluResultado.textContent = 'Volumen diario (1500): ' + resultados.volumenDiario1500 + ' cc';
            manResultado.textContent = 'Volumen diario (2000): ' + resultados.volumenDiario2000 + ' cc';
        }
        errorMensaje.style.display = 'none';
    } else {
        errorMensaje.style.display = 'block';
        fluResultado.textContent = '';
        manResultado.textContent = '';
    }
}

// Evento al hacer clic en el botón "Calcular"
const calcularButton = document.getElementById('calcular');
calcularButton.addEventListener('click', mostrarResultados);