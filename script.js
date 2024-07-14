d3.json("http://output.jsbin.com/lixujex/1.js").then(function (datos) {
        
    var escalaTamanio = d3.scaleLinear()
    //.domain ([0,3000])
    .domain(d3.extent(datos, function (d) {return d.votantes; } ))
    .range(["10px", "100px"])
     
    var escalaColor = d3.scaleLinear()
    .domain ([0,10])
    .range (["green", "yellow"]);
    
    var elementoUl = d3.select ("body").append("ul");
    
    /*
    Posibilidad: recorriendo los elementos
    datos.forEach(function (d){
        elementoUl.append("li").text(d.partido);        
    });
    */

    /*
    Mejor posibilidad: data binding 
    */
    elementoUl
        .selectAll("li") // seleccion de tantas li como haga falta
        .data(datos) // JOIN
        .join("li")
        // Nota: En versiones anteriores se utilizaba enter-append y debía utilizarse .append("li")
        .text(function (d) {return d.partido; })    
        // Ejemplos para mostrar la necesidad de escala.
        // Valor fijo: .style("font-size", 100)
        // Valor basado en num-votantes: .style("font-size", function (d) {return d.votantes})
        // Nota: 
        // - En una de las sesiones tuvo un comportamiento anómalo, pero no lo he reproducido de nuevo 
        // - Sin embargo el código anterior funciona correctamente
        // Valor fijo: .style("font-size", "100px")
        // Valor basado en num-votantes: .style("font-size", function (d) {return d.votantes + "px"})  
    
        // Concepto de escala
        .style("font-size", function (d) {return escalaTamanio(d.votantes); })
        .style("color", function (d) {return escalaColor(d.mediaAutoubicacion); }) 
});