import { StyleSheet } from 'react-native'

const ServiceItem = ({service}) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{service.title}</h3>
      <p className={styles.description}>{service.description}</p>

      <div className={styles.info}>
        <p><strong>Categoría:</strong> {service.category}</p>
        <p><strong>Horas:</strong> {service.hours}</p>
        <p><strong>Método de contacto:</strong> {service.contact}</p>
        <p><strong>Ubicación:</strong> {service.location}</p>
      </div>

      <button className={styles.button} onClick={''}>
        Ver más
      </button>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    transition: 'transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  },
  title: {
    fontSize: 20,
    color: '#222',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    color: '#555',
    marginBottom: 12,
    lineHeight: 1.4,
  },
  info: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    padding: '8px 14px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'background-color 0.2s ease',
  }

})

export default ServiceItem