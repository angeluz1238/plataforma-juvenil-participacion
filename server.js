const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 30000;

app.use(express.json());
app.use(express.static(__dirname));


const rutacandidatos= path.join(__dirname, 'data', 'candidatos.json');

function leerCandidatos() {
    const data = fs.readFileSync(rutacandidatos, 'utf-8');
    return JSON.parse(data);
}

function guardarCandidatos(candidatos) {
    fs.writeFileSync(rutacandidatos, JSON.stringify(candidatos, null, 2));
}

app.get('/candidatos', (req, res) => {
    const candidatos = leerCandidatos();
    res.json(candidatos);
});

app.post('/api/candidatos', function (req, res) {
    const nuevoCandidato = {
        id: Date.now(),
        nombre: req.body.nombre,
        rol: req.body.rol,
        propuesta: req.body.propuesta,
        estado: "perfil de práctica académica"
    };

    if (!nuevoCandidato.nombre || !nuevoCandidato.rol || !nuevoCandidato.propuesta) {
        return res.status(400).json({
            mensaje: "faltan datos obligatorios"
        });
    }

    const candidatos = leerCandidatos();
    candidatos.push(nuevoCandidato);
    guardarCandidatos(candidatos);

    res.status(201).json({
        mensaje: "perfil guardado correctamente",
        candidato: nuevoCandidato
    });
});

app.listen(PORT, function() {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
}); 