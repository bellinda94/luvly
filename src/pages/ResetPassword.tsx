import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { exitRecoveryMode } = useAuth(); // Get the function to exit recovery mode

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (password.length < 6) {
        toast.error('Password should be at least 6 characters.');
        setMessage('Password should be at least 6 characters.');
        setLoading(false);
        return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: password });
      if (error) {
        throw error;
      }
      toast.success('Password updated successfully! You can now log in.');
      setMessage('Password updated successfully! Redirecting...');
      // Exit recovery mode after a short delay to show the message
      setTimeout(() => {
        exitRecoveryMode(); 
        // Optional: You might want to redirect the user explicitly here
        // e.g., navigate('/auth'); if using useNavigate from react-router-dom
      }, 2000); 
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast.error(error.error_description || error.message);
      setMessage(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h2>
        <form onSubmit={handlePasswordReset}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Enter your new password'
              className="w-full"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
        {message && <p className="mt-4 text-sm text-center text-red-600">{message}</p>}
         <p className="mt-4 text-sm text-center">
           Remember your password?{' '}
           <button onClick={exitRecoveryMode} className="text-blue-600 hover:underline">
             Back to Login
           </button>
         </p>
      </div>
    </div>
  );
};

export default ResetPassword;
