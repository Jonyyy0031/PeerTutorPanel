import Sidebar from "../layout/sidebar";

// type LayoutProps = {
//   children: ReactNode;
// };

// function Layout({ children }: LayoutProps) {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="ml-64 w-full">{children}</div>
//     </div>
//   );
// }
interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 bg-background-card">{children}</main>
    </div>
  );
}

export default Layout;
