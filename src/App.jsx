import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [datos, setDatos] = useState([]) // Estado para almacenar los datos de la API

  // async: indica que la función es asíncrona, sirve para manejar operaciones que toman tiempo, como solicitudes de red
  // await: se usa para esperar a que una promesa se resuelva antes de continuar con la ejecución del código

  // useEffect para obtener los datos al montar el componente
  useEffect(() => {
    // Función asíncrona para obtener los datos de la API
    const obtenerDatos = async () => {
      try {
        const solicitud = await fetch('https://dragonball-api.com/api/characters?limit=100') // Reemplaza con la URL correcta de la API
        const respuesta = await solicitud.json() // Convierte la respuesta a JSON
        setDatos(respuesta.items) // Ajusta esto según la estructura del json recibido, en este caso obtenemos los 'items'
      } catch (error) {
        console.error('Error fetching data:', error) // Manejo de errores
      }
    }
    obtenerDatos(); // Llama a la función para obtener los datos
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  return (
    <>
      <div className='contenedor'>
        <div className='titulo'>
          <img src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=cover,format=auto,quality=85,width=1920/keyart/G8DHV7W21-backdrop_wide" alt="Banner" />
          <h1>Personajes de Dragon Ball Z - API</h1>
        </div>
        <div className='cards'>
          {datos.map((personaje) => ( // Mapea sobre los datos y crea una tarjeta para cada personaje, 'datos' es el estado que contiene los personajes
            <div className='card' key={personaje.id}>
              <img src={personaje.image} alt={personaje.name} />
              <h4>{personaje.name}</h4>
              <p>{personaje.race} - {personaje.gender === 'Male' ? 'Masculino' : 'Femenino'}</p>
              <p>KI Base:</p>
              <p>{personaje.ki !== 'unknown' ? personaje.ki : 'Desconocido'}</p>
              <p>KI Total:</p>
              <p>{personaje.maxKi !== 'unknown' ? personaje.maxKi : 'Desconocido'}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App