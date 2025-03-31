
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success("Registrierung erfolgreich! Bitte überprüfe deine E-Mails.");
    } catch (error: any) {
      toast.error(error.message || "Ein Fehler ist aufgetreten.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      navigate("/app");
      toast.success("Erfolgreich angemeldet!");
    } catch (error: any) {
      toast.error(error.message || "Anmeldung fehlgeschlagen.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth`,
      });
      
      if (error) throw error;
      
      setResetSent(true);
      toast.success("E-Mail zum Zurücksetzen des Passworts wurde gesendet!");
    } catch (error: any) {
      toast.error(error.message || "Fehler beim Senden der Zurücksetz-E-Mail.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-secondary/30 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Willkommen bei Luvly</CardTitle>
          <CardDescription>
            Finde authentische Verbindungen mit verifizierten Nutzern
          </CardDescription>
        </CardHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Anmelden</TabsTrigger>
            <TabsTrigger value="register">Registrieren</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleSignIn}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Input 
                    type="email" 
                    placeholder="E-Mail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input 
                    type="password" 
                    placeholder="Passwort" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-right">
                  <Button 
                    type="button" 
                    variant="link" 
                    className="p-0 h-auto text-sm"
                    onClick={() => setResetDialogOpen(true)}
                  >
                    Passwort vergessen?
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Wird angemeldet..." : "Anmelden"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleSignUp}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Input 
                    type="email" 
                    placeholder="E-Mail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input 
                    type="password" 
                    placeholder="Passwort (mind. 6 Zeichen)" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Registrierung läuft..." : "Registrieren"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Dialog zum Zurücksetzen des Passworts */}
      <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Passwort zurücksetzen</DialogTitle>
            <DialogDescription>
              Gib deine E-Mail-Adresse ein, um einen Link zum Zurücksetzen deines Passworts zu erhalten.
            </DialogDescription>
          </DialogHeader>
          
          {!resetSent ? (
            <form onSubmit={handleResetPassword}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="E-Mail-Adresse"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setResetDialogOpen(false)}
                >
                  Abbrechen
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Wird gesendet..." : "Link senden"}
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="py-6 flex flex-col items-center text-center gap-4">
              <AlertCircle className="h-10 w-10 text-primary" />
              <div>
                <p className="font-medium mb-1">E-Mail gesendet!</p>
                <p className="text-sm text-muted-foreground">
                  Bitte überprüfe deine E-Mails und folge dem Link, um dein Passwort zurückzusetzen.
                </p>
              </div>
              <Button onClick={() => {
                setResetDialogOpen(false);
                setResetSent(false);
                setResetEmail("");
              }}>
                Schließen
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Auth;
