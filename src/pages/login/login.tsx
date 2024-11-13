import LogoUni from '../../assets/LogoPoli.svg';

const login: React.FC = () => {
    return(
        <div className="bg-Uni-1 bg-UniBg bg-no-repeat h-screen w-full m-auto">
                <div className="grid grid-cols-2 h-full w-full items-center ">
                    <div>
                        <img src={LogoUni} alt="LogoUni" className='ml-[10vw] h-48' />
                    </div>
                    <div className='flex flex-col w-[760px] h-[720px] border-xl  bg-white p-8 rounded-xl shadow-2xl '>
                        <h1 className="text-4xl font-bold text-center mt-20">Programa Estudiantil de Tutorias</h1>
                        <form action="">
                            <div className="flex flex-col mt-24">
                                <label className="text-2xl font-bold mb-4">Usuario</label>
                                <input type="text" className="border  border-black mt-2 p-2"/>
                            </div>
                            <div className="flex flex-col mt-8">
                                <label className="text-2xl font-bold mb-4">Contraseña</label>
                                <input type="text" className="border  border-black mt-2 p-2"/>
                            </div>
                            <div className="flex justify-end mt-16 mr-8">
                                <button className="bg-Uni-1 text-white p-4 w-48 rounded-xl">Iniciar Sesión</button>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
    )
}

export default login;