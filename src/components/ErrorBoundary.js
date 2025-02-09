import React, { Component } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <FaExclamationCircle className="error-icon" />
          <h1>Something went wrong.</h1>
          <button onClick={this.handleRetry} className="retry-button">Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;