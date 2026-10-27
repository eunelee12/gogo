import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App Error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4 font-sans text-slate-800">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-xl border-4 border-pink-300 text-center space-y-4">
            <div className="text-5xl">🐰💦</div>
            <h1 className="text-2xl font-black text-pink-600">화면을 불러오는 중 문제가 생겼어요!</h1>
            <p className="text-sm text-slate-600">
              저장된 이전 데이터와의 충돌일 수 있습니다. 아래 버튼을 눌러 데이터를 초기화하고 다시 시작해 보세요.
            </p>
            <div className="bg-slate-50 p-3 rounded-xl text-xs text-left text-red-500 overflow-x-auto max-h-32 border border-slate-200">
              {this.state.error?.message || '알 수 없는 오류'}
            </div>
            <button
              onClick={this.handleReset}
              className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer"
            >
              🔄 데이터 초기화하고 다시 열기
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
