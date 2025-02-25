function BaseLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-[1280px] mt-[5%]">{children}</div>;
}

export default BaseLayout;
