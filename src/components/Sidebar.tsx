import React from 'react';
import { Menu, X, BarChart2, Calendar, Tag, Settings } from 'lucide-react';
import { Container } from './Layout/Container';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <>
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } z-40`}
      >
        <Container className="py-6">
          <nav className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="w-5 h-5" />
                Statistiques
              </h2>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600 dark:text-gray-300">
                  Tâches en cours: <span className="font-bold">12</span>
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Temps moyen: <span className="font-bold">45min</span>
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Productivité: <span className="font-bold">85%</span>
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Catégories
              </h2>
              <div className="space-y-1">
                {['Personnel', 'Travail', 'Projets', 'Santé', 'Loisirs'].map((category) => (
                  <button
                    key={category}
                    className="w-full text-left px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Échéances
              </h2>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p>Cette semaine: <span className="font-bold">5</span></p>
                <p>Ce mois: <span className="font-bold">12</span></p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Paramètres
              </button>
            </div>
          </nav>
        </Container>
      </div>
    </>
  );
}