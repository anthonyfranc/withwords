export default eventHandler(event => {
    // Update request path to include auth prefix
    if (!event.path.startsWith('/api/auth')) {
      event.path = `/api/auth${event.path}`
    }
    return serverAuth().handler(toWebRequest(event))
  })