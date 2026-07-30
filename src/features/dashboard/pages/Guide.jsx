"use client";

import Link from "next/link";
import { useDashboard } from "../DashboardContext";

const steps = [
    {
        number: "1",
        title: "Configura tu negocio",
        summary: "Es la ficha pública de tu local: lo primero que ven tus clientes.",
        affects: [
            "Nombre, email, teléfono y dirección en la página de reservas",
            "Logo y portada (si los subes) en el hero de /reservar/tu-slug",
            "El enlace público que compartirás (no lo cambies a la ligera)",
        ],
        how: [
            "Ve a Resumen y edita los datos del negocio",
            "Sube logo y cover para que la página se vea más profesional",
            "Copia el enlace /reservar/… y pruébalo en otra pestaña",
        ],
        varies: [
            "Sin logo/cover la página funciona igual, pero se ve más genérica",
            "Si cambias el slug, el enlace antiguo deja de funcionar",
        ],
        to: "/dashboard",
        action: "Ir a Resumen",
    },
    {
        number: "2",
        title: "Crea tus servicios",
        summary: "Define qué se puede reservar y a qué precio.",
        affects: [
            "La lista de servicios en la página pública",
            "El precio y la duración que ve el cliente",
            "Los huecos de agenda (la duración condiciona los horarios disponibles)",
        ],
        how: [
            "En Servicios, añade nombre, precio y duración en minutos",
            "Crea al menos uno para poder probar una reserva real",
            "Edita o elimina si cambias tarifas o dejas de ofrecerlo",
        ],
        varies: [
            "Puedes tener muchos servicios (corte, color, pacquete…)",
            "Si no hay servicios, el cliente no podrá completar una reserva online",
        ],
        to: "/dashboard/servicios",
        action: "Ir a Servicios",
    },
    {
        number: "3",
        title: "Añade tu equipo",
        summary: "Quién atiende las citas.",
        affects: [
            "La elección de profesional en la página pública",
            "La opción “Cualquier profesional”",
            "Las reservas asignadas a cada persona",
        ],
        how: [
            "En Empleados, crea cada miembro del equipo",
            "Activa o desactiva si alguien no está disponible temporalmente",
            "Luego podrás afinar su horario en Horarios",
        ],
        varies: [
            "Con un solo empleado, el cliente igual puede elegir “cualquier profesional”",
            "Sin empleados activos, la reserva online se complica o no tiene sentido",
        ],
        to: "/dashboard/empleados",
        action: "Ir a Empleados",
    },
    {
        number: "4",
        title: "Define horarios",
        summary: "Cuándo puede reservarse una cita.",
        affects: [
            "Los huecos que salen al elegir fecha en la página pública",
            "El horario general del negocio",
            "Horarios distintos por empleado (si los configuras)",
        ],
        how: [
            "En Horarios, marca días y franjas de apertura del negocio",
            "Opcional: selecciona un empleado y define su propio horario",
            "Prueba en la página pública eligiendo hoy/mañana y mira los slots",
        ],
        varies: [
            "Sin horario, no habrá (o habrá muy pocos) horarios disponibles",
            "Puedes cerrar un día quitando esa franja",
            "El horario del empleado puede ser más restringido que el del negocio",
        ],
        to: "/dashboard/horarios",
        action: "Ir a Horarios",
    },
    {
        number: "5",
        title: "Gestiona reservas",
        summary: "El día a día de tu agenda.",
        affects: [
            "Las citas hechas online por clientes",
            "Las que creas tú a mano (teléfono, walk-in…)",
            "Edición y cancelación desde el panel",
        ],
        how: [
            "En Reservas verás el listado ordenado",
            "Puedes crear una reserva manual eligiendo servicio, empleado y hora",
            "Edita o elimina si el cliente cambia o cancela",
        ],
        varies: [
            "Una reserva online ocupa el hueco: ese slot ya no sale disponible",
            "Si creas muchas a mano, revisa que no pisen los horarios públicos",
        ],
        to: "/dashboard/reservas",
        action: "Ir a Reservas",
    },
    {
        number: "6",
        title: "Comparte tu página pública",
        summary: "Ahí reservan tus clientes sin registrarse.",
        affects: [
            "Todo lo configurado arriba se refleja en /reservar/tu-slug",
            "Servicios, equipo, horarios y reseñas visibles",
            "Las nuevas reservas llegan a tu panel",
        ],
        how: [
            "Copia el enlace desde Resumen",
            "Compártelo por WhatsApp, Instagram, Google o tu web",
            "Haz una reserva de prueba tú mismo para validar el flujo",
        ],
        varies: [
            "Cada negocio tiene su propio enlace (slug)",
            "Si aún faltan servicios u horarios, la página se verá incompleta",
        ],
        to: "/dashboard",
        action: "Ver enlace en Resumen",
        openPublic: true,
    },
    {
        number: "7",
        title: "Pide reseñas",
        summary: "Prueba social en tu página de reservas.",
        affects: [
            "Las reseñas publicadas aparecen en /reservar/tu-slug",
            "Puedes listarlas todas en /reservar/tu-slug/reviews",
            "La invitación se envía por WhatsApp con un enlace temporal",
        ],
        how: [
            "En Reseñas, introduce el teléfono del cliente",
            "Se abre WhatsApp con el mensaje y el link de reseña",
            "El cliente deja nota y comentario; el enlace caduca (unos 20 min) y solo sirve una vez",
        ],
        varies: [
            "Sin invitaciones, la sección de reseñas puede quedar vacía",
            "Una reseña ya enviada no se puede repetir con el mismo enlace",
        ],
        to: "/dashboard/reviews",
        action: "Ir a Reseñas",
    },
];

function Guide() {
    const { user } = useDashboard();
    const slug = user?.business?.slug;
    const publicUrl = slug ? `/reservar/${slug}` : null;

    return (
        <div className="dash-section">
            <h2 className="dash-section-title">Cómo usar</h2>
            <p className="dash-section-hint">
                Guía completa del panel. Cada paso explica qué cambia en tu negocio,
                cómo hacerlo y qué pasa si lo configuras de otra forma.
            </p>

            <div className="dash-guide-list">
                {steps.map((step) => (
                    <article key={step.number} className="dash-guide-card dash-guide-card--detailed">
                        <span className="dash-guide-number">{step.number}</span>
                        <div className="dash-guide-body">
                            <h3>{step.title}</h3>
                            <p className="dash-guide-summary">{step.summary}</p>

                            <div className="dash-guide-block">
                                <h4>En qué afecta</h4>
                                <ul>
                                    {step.affects.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="dash-guide-block">
                                <h4>Cómo se hace</h4>
                                <ol>
                                    {step.how.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ol>
                            </div>

                            <div className="dash-guide-block">
                                <h4>Cómo puede variar</h4>
                                <ul>
                                    {step.varies.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="dash-guide-actions">
                                <Link href={step.to} className="dash-guide-link">
                                    {step.action}
                                </Link>
                                {step.openPublic && publicUrl && (
                                    <a
                                        href={publicUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="dash-guide-link dash-guide-link--secondary"
                                    >
                                        Abrir página pública
                                    </a>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Guide;
