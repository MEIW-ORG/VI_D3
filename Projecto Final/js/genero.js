/*
Mestrado em Engenharia Informática e Tecnologia Web
UC Visualização de Informação
Tópico 5 - Projecto Final
Autores: Claudia Pires (1303334) / Valter Bastos (2302612)
Ficheiro JavaScript
*/


// Função para ler e processar o arquivo JSON
function processGenderData(filePath) {
    return fetch(filePath)
        .then(response => response.json())
        .then(json => {
            const results = {};
            const counts = {};
            json.Gender.forEach(item => {
                const year = item.Year;
                const gender = item.Gender;
                const povertyPercent = item["% of Gender Population under Poverty Line"];

                if (!results[year]) {
                    results[year] = { Male: 0, Female: 0 };
                    counts[year] = { Male: 0, Female: 0 };
                }

                results[year][gender] += povertyPercent;
                counts[year][gender]++;
            });

            // Converte os totais para médias
            for (const year in results) {
                results[year].Male = (results[year].Male / counts[year].Male)/100;
                results[year].Female = (results[year].Female / counts[year].Female)/100;
            }

            return results;
        })
        .catch(error => console.error('Error loading JSON:', error));
}

// Uso da função
processGenderData('./data/Gender.json').then(processedData => {
    const barChartData = Object.keys(processedData).sort().map(year => ({
        year: year,
        Male: processedData[year].Male,
        Female: processedData[year].Female
    }));
    
    drawBarChart(barChartData); // Chama a função drawBarChart com os dados processados
});




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

