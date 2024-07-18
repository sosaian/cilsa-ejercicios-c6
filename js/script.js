/*
    MARK: EJERCICIOS CLASE 6

    *   Crear un formulario de datos personales
    *   Agregar CSS necesario para dar 2 estilos al formulario (normal y uno de "Alto Contraste")
    *   Agregar atributos a inputs del formulario para campos obligatorios
    *   Validar inputs del usuario en este formulario
*/

function validateEmail(email) {
    /*
         Es importante tener en cuenta que no cubre todos los casos posibles y específicos definidos por 
         los estándares de correos electrónicos (RFC 5322), pero es adecuado para la mayoría de los 
         propósitos comunes.
    */

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    /* 
        Desglose de la Expresión Regular
            ^: Comienzo de la línea.
            [^\s@]+: Uno o más caracteres que no son espacios en blanco ni '@'.
            @: Exactamente un símbolo '@'.
            [^\s@]+: Uno o más caracteres que no son espacios en blanco ni '@'.
            \.: Exactamente un punto '.'.
            [^\s@]+: Uno o más caracteres que no son espacios en blanco ni '@'.
            $: Fin de la línea.
            */
           
    return regex.test(email)
}
        
function cambiarClaseSegunAncho() {
    if ($(window).width() < 768) {
        $('#navbarTogglerDemo02').addClass('collapse navbar-collapse ')
    } else {
        $('#navbarTogglerDemo02').removeClass('collapse navbar-collapse')
    }
}

function checkForm() {

    const NAME = $("#formName")
    const EMAIL = $("#formEmail")
    const MESSAGE = $("#formMessage")

    //  Intencionalmente evito un early return para avisar al usuario de todos
    //  los errores al mismo tiempo en lugar del primero que se encuentre.

    //  Además, incluyo una condición extra para devolver error sii el campo
    //  en cuestión es obligatorio en el formulario (el atributo 'required')

    let ERROR = "¡UPS! Parece que los siguientes campos no tienen información válida:\n"

    if (NAME.val().trim() === "" && NAME.prop('required'))
        ERROR = ERROR.concat("\n* El campo 'Nombre' NO puede estar vacío.")
    
    if (!validateEmail(EMAIL.val().trim()) && EMAIL.prop('required'))
        ERROR = ERROR.concat("\n* El campo 'Correo electrónico' debe tener un email válido.")

    if (MESSAGE.val().trim() === "" && MESSAGE.prop('required'))
        ERROR = ERROR.concat("\n* El campo 'Mensaje' NO puede estar vacío.")

    if (ERROR === "¡UPS! Parece que los siguientes campos no tienen información válida:\n")
    {
        alert("FORMULARIO ENVIADO CORRECTAMENTE!")
        location.reload()
        return
    }

    alert(ERROR)
}

function cambiarModo(modo){
    $("body").attr("data-bs-theme", modo);
}

$( document ).ready(() => {

    $(window).resize(() => {
        const NAVBAR = $('#navbarTogglerDemo02');
        const SHOULD_COLLAPSE = $(window).width() < 992;
        NAVBAR.toggleClass('collapse navbar-collapse', SHOULD_COLLAPSE);
    }).trigger('resize');

    const modoActual = localStorage.getItem("colorMode") || null

    if(modoActual != null){
        cambiarModo(modoActual)
    }else{
        localStorage.setItem("colorMode", "light")
    }

    const HTML = $('html')
    const BODY = $("body")
    const DEFAULT_STYLE_BUTTON = $("#styleDefault")
    const HIGH_CONTRAST_STYLE_BUTTON = $("#styleHighContrast")
    const LEGEND = $("#formLegend")
    const LABELS = $('label')
    const SUBMIT_BUTTON = $("#formSubmit")

    DEFAULT_STYLE_BUTTON.click(() => {
        DEFAULT_STYLE_BUTTON.addClass("active")
        HIGH_CONTRAST_STYLE_BUTTON.removeClass("active")
        HTML.css('--bs-warning-bg-subtle', '#fff3cd', 'important')
        LEGEND.css('color', '#212529', 'important')
        LABELS.css('color', '#212529', 'important')

        localStorage.setItem("colorMode", "light")
        cambiarModo("light")
    })
    
    HIGH_CONTRAST_STYLE_BUTTON.click(() => {
        HIGH_CONTRAST_STYLE_BUTTON.addClass("active")
        DEFAULT_STYLE_BUTTON.removeClass("active")
        HTML.css('--bs-warning-bg-subtle', '#121212', 'important')
        LEGEND.css('color', '#f2f2f2', 'important')
        LABELS.css('color', '#f2f2f2', 'important')

        localStorage.setItem("colorMode", "dark")
        cambiarModo("dark")
    })

    SUBMIT_BUTTON.click( (event) => {
        event.preventDefault()
        checkForm()
    })
})
