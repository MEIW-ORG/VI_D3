/*
Mestrado em Engenharia Informática e Tecnologia Web
UC Visualização de Informação
Tópico 5 - Projecto Final
Autores: Claudia Pires (1303334) / Valter Bastos (2302612)
Ficheiro JavaScrip
*/


//method to keep the vis responsive
function responsify(svg) {
    const container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style('width'), 10),
        height = parseInt(svg.style('height'), 10),
        aspect = width / height;
    svg.attr('viewBox', `0 0 ${width} ${height}`).
    attr('preserveAspectRatio', 'xMinYMid').
    call(resize);
    //detect resize event, call resize to set new atributes
    d3.select(window).on('resize.' + container.attr('id'), resize);

    function resize() {
        const targetWidth = parseInt(container.style('width'));
        svg.attr('width', targetWidth);
        svg.attr('height', Math.round(targetWidth / aspect));
    }
}
