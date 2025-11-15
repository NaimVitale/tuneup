import { useParams } from "react-router-dom";
import InputForm from "../components/InputForm";
import { useGetUser } from "../hooks/useGetUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useUpdateUserPassword } from "../hooks/useUpdateUserPassword";

export default function ProfileInfoPage(){

    const { id: userId } = useParams();
    const { userData, loading, error } = useGetUser(userId);
    const { form, handleChange, handleSubmit, loadingUpdate, errorUpdate, updatedUser, success} = useUpdateUser({userData})
    const { form: passwordForm, handleChangePassword, handleSubmitPassword, loading: loadingPassword, errorPassword, success: successPassword,} = useUpdateUserPassword();

    return(
        <div>
            <h1 className="text-2xl mb-6">¡Bienvenido! {userData?.nombre}</h1>
            <div className="w-full">
                <h3 className="mb-5 text-xl">Mi información</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(userId);
                }}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                    <InputForm label={"Nombre"} type="text" id={"nombre"} value={form.nombre} onChange={handleChange} error={errorUpdate?.nombre}></InputForm>
                    <InputForm label={"Apellido"} type="text" id={"apellido"} value={form.apellido} onChange={handleChange} error={errorUpdate?.apellido}></InputForm>
                    <InputForm label={"Correo electrónico"} type="text" id={"email"} value={form.email} onChange={handleChange} error={errorUpdate?.email}></InputForm>
                    </div>
                    {errorUpdate && <p className="text-red-500 text-sm mb-4">{errorUpdate.message || errorUpdate.general}</p>}
                    {success && <p className="text-green-500 text-sm mb-4">Usuario actualizado</p>}
                    <button className="btn-primary py-2 px-4 text-md w-max">Actualizar información</button>
                </form>
                <h3 className="mb-5 text-xl mt-8">Cambiar contraseña</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitPassword(userId);
                }}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                    <InputForm label={"Contraseña actual"} type="password" id={"oldPassword"} value={passwordForm.oldPassword} onChange={handleChangePassword}></InputForm>
                    <InputForm label={"Contraseña nueva"} type="password" id={"newPassword"} value={passwordForm.newPassword} onChange={handleChangePassword}></InputForm>
                    </div>
                    {errorPassword && <p className="text-red-500 text-sm mb-4">{errorPassword.message || errorPassword}</p>}
                    {successPassword && <p className="text-green-500 text-sm mb-4">Contraseña actualizada</p>}
                    <button className="btn-primary py-2 px-4 text-md w-max">Actualizar contraseña</button>
                </form>
            </div> 
        </div>        
    );
}