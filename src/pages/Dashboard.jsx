import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import {getMe, createBusiness} from "../services/authService";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleCreateBusiness = async (e) => {
        e.preventDefault();
    
        try {
            await createBusiness({ name, slug, email, phone: "", address: "", logo: "" });
            const data = await getMe();  
            setUser(data);                
        } catch (err) {
            setError(err.message);
        }
    };


    useEffect(() => {
        const fetchUser = async () => {
            const data = await getMe();
            setUser(data);
        }
        fetchUser();
    }, []);

    if (!user) return <p>Cargando...</p>;

    if(!user.business){
        return (
            <div>
                <h1>Crea tu negocio</h1>
                <form onSubmit={handleCreateBusiness}>
                    <input
                        type="text"
                        placeholder="Nombre del negocio"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="mi-barberia"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email del negocio"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit">Crear mi negocio</button>
                </form>
                {error && <p>{error}</p>}
            </div>
        );

    } 

    return (
        <div>
            <Header />
            <h1>Dashboard</h1>
            <p>Bienvenido, {user.name}</p>
            <p>Negocio: {user.business.name}</p>
        </div>
    );
}

export default Dashboard;