import { useCallback } from 'react';
import { useToast } from '../context/ToastContext';

/** Consistent messaging for interactions that a real backend would power. */
export function useDemoNotice() {
  const { toast } = useToast();

  return useCallback(
    (message = 'This interaction is part of the demonstration. Nothing was sent or saved.') => {
      toast({ title: 'Demo interaction', description: message, tone: 'info' });
    },
    [toast],
  );
}
