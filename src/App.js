import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {

  const [titulo, setTitulo] = useState('')
  const [conteudo, setConteudo] = useState('')
  const [notas, setNotas] = useState([])

  async function buscarNotas() {

    const { data, error } = await supabase
      .from('notas')
      .select('*')

    if (error) {
      console.log(error)
      return
    }

    setNotas(data)
  }

  async function adicionarNota() {

    if (!titulo || !conteudo) {
      alert('Preencha todos os campos')
      return
    }

    const { error } = await supabase
      .from('notas')
      .insert([
        {
          titulo,
          conteudo
        }
      ])

    if (error) {
      console.log(error)
      return
    }

    setTitulo('')
    setConteudo('')

    buscarNotas()
  }

  useEffect(() => {
    buscarNotas()
  }, [])

  return (
    <div style={{ padding: 20 }}>

      <h1>Notas Rápidas</h1>

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Conteúdo"
        value={conteudo}
        onChange={(e) => setConteudo(e.target.value)}
      />

      <br /><br />

      <button onClick={adicionarNota}>
        Salvar Nota
      </button>

      <hr />

      <h2>Minhas Notas</h2>

      {notas.map((nota) => (
        <div key={nota.id}>
          <h3>{nota.titulo}</h3>
          <p>{nota.conteudo}</p>
        </div>
      ))}

    </div>
  )
}

export default App