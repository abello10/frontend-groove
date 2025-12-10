import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-10 pb-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-extrabold tracking-wider text-sky-500">
                            GROOVE
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center">
                        <Link 
                            to="/contacto" 
                            className="text-gray-300 hover:text-sky-400 transition-colors text-sm font-medium"
                        >
                            Contáctanos
                        </Link>
                        
                        <Link 
                            to="/nosotros" 
                            className="text-gray-300 hover:text-sky-400 transition-colors text-sm font-medium"
                        >
                            Acerca de nosotros
                        </Link>
                        
                        <Link 
                            to="/terminos" 
                            className="text-gray-300 hover:text-sky-400 transition-colors text-sm font-medium"
                        >
                            Términos y condiciones
                        </Link>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-600 text-xs">
                        &copy; {new Date().getFullYear()} Groove. Todos los derechos legal e ilegalmente reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;