
export interface User {
  id: string;
  name: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  user: User;
  module: string;
  action: string;
  target: string | null;
  type: 'check-in' | 'check-out' | 'update' | 'creation' | 'deletion' | 
        'payment' | 'refund' | 'charge' | 'payment-error' | 'status-change' | 
        'maintenance' | 'security' | 'report' | 'system-maintenance' | 'cancellation';
  severity: 'info' | 'warning' | 'error';
}
