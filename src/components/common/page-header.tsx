type PageHeaderProps = {
  title: string;
  subtitle: string;
};

const PageHeader = ({ subtitle, title }: PageHeaderProps) => {
  return (
    <div className="pb-6 pt-16 lg:pb-16 lg:pt-32 px-4 container max-w-5xl mx-auto border-b border-black/10 dark:border-white/10">
      <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl text-primary">
        {title}
      </h1>
      <p className="my-4 text-base text-muted/60 md:text-2xl">{subtitle}</p>
    </div>
  );
};

export default PageHeader;
