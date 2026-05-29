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

const rutaVotos = path.join(__dirname, 'data', 'votos.json');

function leerVotos() {
    const data = fs.readFileSync(rutaVotos, 'utf8');
    return JSON.parse(data);
}

function guardarVotos(votos) {
    fs.writeFileSync(rutaVotos, JSON.stringify(votos, null, 2));
}

app.get('/candidatos', (req, res) => {
    const candidatos = leerCandidatos();
    res.json(candidatos);
});

app.get('/api/candidatos', (req, res) => {
    const candidatos = leerCandidatos();
    res.json(candidatos);
});

app.get('/api/votos', (req, res) => {
    const votos = leerVotos();
    res.json(votos);
});

app.post('/api/votos', function (req, res) {
    const nuevoVoto = {
        identificacion: req.body.identificacion,
        candidato: req.body.candidato,
        fecha: new Date().toISOString()
    };

    if (!nuevoVoto.identificacion || !nuevoVoto.candidato) {
        return res.status(400).json({
            mensaje: "faltan datos obligatorios"
        });
    }

    const votos = leerVotos();
    votos.push(nuevoVoto);
    guardarVotos(votos);

    res.status(201).json({
        mensaje: "voto registrado correctamente",
        voto: nuevoVoto
    });
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