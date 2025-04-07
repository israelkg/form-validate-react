import { useForm } from 'react-hook-form';
import './App.css';

function App() {
  const { register, handleSubmit, formState: {errors, touchedFields} } = useForm();

  const handleSubmitForm = (data) => {
    console.log(data)
  }

  return (
    <>
      <main>
        <section>
          <div className="copy">
              <h1>
                  FICOU COM DÚVIDA <br />
                  NOS MANDE UMA MENSAGEM!
              </h1>
              <p>
                  Caso tenha ficado com alguma duvida, basta nos mandar uma
                  mensagem e entraremos em contato em menos de 24h
              </p>
          </div>

          <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
              <label htmlFor="nome" />
              <input
                  type="text"
                  name="nome"
                  id="nome"
                  placeholder="Nome completo *"
                  className={`campo ${errors.nome ? "campo-obrigatorio" : ""} ${
                      touchedFields.nome && !errors.nome
                          ? "campo-preenchido"
                          : ""
                  }`}
                  {...register("nome", {
                      required: "Campo obrigatório",
                      validate: (value) => {
                        const palavras = value.trim().split(" ").filter(p => p.length > 0);
                        if (palavras.length < 2) {
                            return "Digite seu nome completo";
                        }
                      }
                  })}
              />

              <label htmlFor="email" />
              <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder=" Email *"
                  className={`campo 
                    ${ errors.email ? "campo-obrigatorio" : ""} 
                    ${ touchedFields.email && !errors.email
                          ? "campo-preenchido"
                          : ""
                  }`}
                  {...register("email", {
                      required: "Campo obrigatório",
                      validate: (value) => {
                        if( !value.includes("@") || ( !value.endsWith(".com"))) return "Email inválido";
                        return true;
                      }
                  })}
              />
              {errors.email && <p className="text-camp-obrg">{errors.email.message}</p>}

              <label htmlFor="telefone" />
              <input
                  type="tel"
                  name="telefone"
                  id="telefone"
                  placeholder="Telefone *"
                  className={`campo ${
                      errors.telefone ? "campo-obrigatorio" : ""
                  } ${
                      touchedFields.telefone && !errors.telefone
                          ? "campo-preenchido"
                          : ""
                  }`}
                  {...register("telefone", {
                      required: "Campo obrigatório",
                      validate: (value => {
                        const numeros = value.replace(/\D/g, "");
                        if ( !numeros.length == 9) return "Número inválido";
                        return true;
                      })
                  })}
              />
              {errors.telefone && <p className="text-camp-obrg">{errors.telefone.message}</p>}

              <label htmlFor="mensagem" />
              <textarea
                  cols="30"
                  rows="5"
                  placeholder="Mensagem *"
                  className={`campo ${
                      errors.mensagem ? "campo-obrigatorio" : ""
                  } ${
                      touchedFields.mensagem && !errors.mensagem
                          ? "campo-preenchido"
                          : ""
                  }`}
                  {...register("mensagem", {
                      required: "Campo obrigatório",
                  })}
              />


              <p className="instrucao">*campos obrigatórios</p>

              <button type="submit" className="enviar">
                  Enviar
              </button>
          </form>
        </section>
      </main>
    </>
  )
}

export default App
