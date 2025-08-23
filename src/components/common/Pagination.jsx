import React from 'react';
import './Pagination.css'; // Vamos criar este CSS

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination-container">
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Anterior
      </button>
      <span className="pagination-info">
        Página {currentPage} de {totalPages}
      </span>
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;