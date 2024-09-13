import { AxeIcon, BicepsFlexed, Dumbbell, HeartPulse, PersonStanding } from "lucide-react";
import MainLayout from "./layout/MainLayout";

const ProfilePage = () => {
    return (
        <MainLayout sectionActive="Profile">
            <section className="w-full flex items-center justify-center">
                <form className="w-full max-w-[750px] lg:w-[750px] lg:max-w-full rounded-lg flex items-center justify-center xl:justify-start">
                    <div className="w-full max-w-[750px] lg:max-w-full lg:w-[750px] rounded-lg shadow-md py-6 px-4 xl:px-8 bg-slate-50 flex flex-col justify-center relative">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Dados do Perfil</h2>
                    <div className='w-[100%] h-[1px] bg-gray-300 mb-2'></div>
                    <p className="text-gray-900 mb-6">Esses dados serão usados para medir sua evolução.</p>
                    <div className="px-4 py-5 bg-white flex justify-between rounded-md shadow-[0px_0px_15px_rgba(0,0,0,0.09)]">
                        <div className="flex flex-col gap-2">
                            <div
                            class="w-[300px]"
                            >
                            <legend class="text-xl font-semibold mb-3 select-none">Defina seu objetivo</legend>
                            <label
                                for="emagrecimento"
                                name="goal"
                                class="font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none"
                            >
                                <div class="w-5">
                                <PersonStanding />
                                </div>
                                Emagrecimento
                                <input
                                type="radio"
                                name="goal"
                                class="w-4 h-4 absolute accent-current right-3"
                                id="emagrecimento"
                                />
                            </label>
                            <label
                                for="hipertrofia"
                                name="goal"
                                class="font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none"
                            >
                                <div class="w-5">
                                <BicepsFlexed />
                                </div>
                                Hipertrofia
                                <input
                                type="radio"
                                name="goal"
                                class="w-4 h-4 absolute accent-blue-500 right-3"
                                id="hipertrofia"
                                />
                            </label>
                            <label
                                for="envelhecimento_saudavel"
                                name="goal"
                                class="font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none"
                            >
                                <div class="w-5">
                                <Dumbbell/>
                                </div>
                                Envelhecimento Saudável
                                <input
                                type="radio"
                                name="goal"
                                class="w-4 h-4 absolute accent-blue-500 right-3"
                                id="envelhecimento_saudavel"
                                />
                            </label>
                            <label
                                for="manutencao_saude"
                                name="goal"
                                class="font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none"
                            >
                                <div class="w-5">
                                <HeartPulse />
                                </div>
                                Manutenção da saúde
                                <input
                                type="radio"
                                name="goal"
                                class="w-4 h-4 absolute accent-blue-500 right-3"
                                id="manutencao_saude"
                                />
                            </label>
                            </div>

                        </div>
                        <div class="w-[300px]">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Insira seus dados atuais: </h2>
                        <div className="flex items-center gap-2">
                            <input type="number" name="weight" className="bg-gray-100 border text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Insira seu peso" />
                            <select name="weight_measure" className="bg-gray-100 border text-gray-900 rounded-lg p-2 mb-4 ">
                                <option value="kg">Kg</option>
                                <option value="lbs">Lbs</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" name="height" className="bg-gray-100 border text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Insira sua altura" />
                            <select name="height_measure" className="bg-gray-100 border text-gray-900 rounded-lg p-2 mb-4 ">
                                <option value="m">m</option>
                                <option value="cm">cm</option>
                                <option value="feet">ft</option>
                            </select>
                        </div>
                        <button type="submit" className=" w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">Salvar</button>
                        </div>
                    </div>
                    </div>
                </form>
            </section>
        </MainLayout>
    )
}

export default ProfilePage;