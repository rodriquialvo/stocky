export const errors = {
    DEFAULT_ERROR: 'Ha ocurrido un error, por favor inténtelo de nuevo más tarde.',
    QUANTITY_LESS_THAN_CURRENT_TOTAL: (index) => `Error en item ${index + 1}, la cantidad no puede ser menor que la cantidad actual`,
};

export const getErrorMessage = (error: string, value?: string) => {
    if (value) {
        return errors[error](value) || errors.DEFAULT_ERROR;
    }

    return errors[error] || errors.DEFAULT_ERROR;
};
