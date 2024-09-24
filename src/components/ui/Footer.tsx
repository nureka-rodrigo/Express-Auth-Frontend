import { Separator } from '@/components/ui/separator';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section className="py-5">
      <div className="container">
        <footer>
          <Separator className="mb-5" />
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Express Auth. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
};