function validaAA(valor, minValor, maxValor) {
    return isNaN(valor) || valor < minValor || valor > maxValor ? false : valor;
}


function validaColor(color) {
    if (color == "") return false;
    else return color;
    /* var $div = $("<div>");
     $div.css("border", "1px solid " + color);
     return ($div.css("border-color") != "")*/
}


class Gauge {
    constructor(ancho, alto, texto, color1, color2) {
        this.ancho = validaAA(ancho, 50, 2000) || 200;
        this.alto = validaAA(alto, 50, 2000) || 200;
        this.texto = texto || "Parámetro";
        this.color1 = validaColor(color1) || "rgba(30% , 50%, 70%, .5)";
        this.color2 = validaColor(color2) || "rgba(90%, 25%, 20%, .8)";
        // crear los 3 divs
        this.divExterno = document.createElement("div");
        this.divInterno = document.createElement("div");
        this.divBase = document.createElement("div");
        this.divExterno.appendChild(this.divInterno);
        this.divExterno.appendChild(this.divBase);
        // estilos div Externo
        this.divExterno.style.position = "absolute";
        this.divExterno.style.width = ancho + "px";
        this.divExterno.style.height = alto + "px";
        this.divExterno.style.background = "linear-gradient(to left, " + this.color1 + " 50%, " + this.color2 + " 55% )";
        this.divExterno.style.borderRadius = "50%";
        // estilos div Interno
        this.divInterno.innerHTML = "50%";
        this.divInterno.style.position = "absolute";
        this.divInterno.style.top = (alto * .075) + "px";
        this.divInterno.style.left = (ancho * .05) + "px";
        this.divInterno.style.width = (ancho * .85) + "px";
        this.divInterno.style.height = (alto * .85) + "px";
        this.divInterno.style.borderRadius = "50%";
        this.divInterno.style.boxSizing = "border-box";
        this.divInterno.style.textAlign = "center";
        this.divInterno.style.paddingTop = (alto * .1) + "px";//"35px";
        //------- Control de la transparencia del background del body
        let bk = getComputedStyle(document.body, null).backgroundColor;
        if (bk == "" || bk == "rgba(0, 0, 0, 0)" || bk == "transparent") bk = "white";
        this.divInterno.style.background = bk;
        // estilos div Base
        this.divBase.innerHTML = this.texto;
        this.divBase.style.position = "absolute";
        this.divBase.style.top = (alto * .4) + "px";
        this.divBase.style.width = ancho + "px";
        this.divBase.style.height = (alto * .6) + "px";
        this.divBase.style.background = bk;
        this.divBase.style.boxSizing = "border-box";
        this.divBase.style.textAlign = "center";
        this.divBase.style.paddingRight = this.divInterno.style.left;
        this.divBase.style.borderTop = "#e1e3fb .5px solid";
    }



    ponGaugeIn(elemento) {
        if (elemento == undefined) return false;
        if (elemento.appendChild(this.divExterno) != this.divExterno) return false;
        else {
            // anular background del contenedor   
            elemento.style.backgroundColor = this.divInterno.style.background;
            return true;
        }
    }


    ponValorGauge(valor) {
        if (isNaN(valor) || valor < 0 || valor > 100) return false;
        let v = 100 - valor;
        this.divExterno.style.background = "linear-gradient(to left, " + this.color1 + " " + v + "%, " + this.color2 + " " + (v + 5) + "% )";
        this.divInterno.innerHTML = valor + "%";
    }


    //"linear-gradient(to left, rgba(30%, 50%, 70%, .8) 50%, rgba(90%, 25%, 20%, .6) 55% )";

}




function inicializar() {
    let myDiv = document.getElementById("prueba");
    let g1 = new Gauge(80, 100, "Valor", "transparent", "rgba(30%, 25%, 70%, .2)");
    g1.ponGaugeIn(myDiv);


    let v = 0;
    function animacion() {
        v < 100 ? v = v + 10 : v = 0;
        g1.ponValorGauge(v);
    }
    setInterval(animacion, 100);

}

window.addEventListener("load", inicializar);