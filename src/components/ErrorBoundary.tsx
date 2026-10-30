import { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, Compass } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.hash = '/';
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            textAlign: 'center',
            backgroundColor: '#FCFAF8'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-surface-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              color: 'var(--color-oxblood)'
            }}
          >
            <Compass size={32} />
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2rem',
              color: 'var(--color-text-main)',
              marginBottom: '12px'
            }}
          >
            Something unexpected occurred
          </h2>
          <p
            style={{
              fontSize: '0.95rem',
              color: 'var(--color-text-muted)',
              maxWidth: '460px',
              lineHeight: 1.6,
              marginBottom: '28px'
            }}
          >
            We encountered a temporary interface issue. You can return to our curated boutique edit to continue exploring.
          </p>
          <button
            onClick={this.handleReset}
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <RotateCcw size={16} />
            <span>Return to Boutique</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
