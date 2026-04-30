import { MDXRemote } from 'next-mdx-remote/rsc';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(String(props.children));
    return (
      <h2
        id={id}
        className="text-2xl font-bold font-[family-name:var(--font-heading)] text-white mt-10 mb-4 scroll-mt-24"
        {...props}
      />
    );
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(String(props.children));
    return (
      <h3
        id={id}
        className="text-xl font-semibold font-[family-name:var(--font-heading)] text-white mt-8 mb-3 scroll-mt-24"
        {...props}
      />
    );
  },
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-slate-300 leading-[1.7] mb-5" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-outside pl-6 mb-5 space-y-2 text-slate-300" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-outside pl-6 mb-5 space-y-2 text-slate-300" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-[1.7]" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-cyan hover:text-cyan-dim underline underline-offset-2 transition-colors" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-2 border-cyan pl-4 my-6 text-slate-400 italic" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-white font-semibold" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="text-sm bg-navy-light text-cyan px-1.5 py-0.5 rounded" {...props} />
  ),
  hr: () => <hr className="border-navy-border my-8" />,
};

export default function MDXContent({ source }: { source: string }) {
  return (
    <div data-article-content>
      <MDXRemote source={source} components={components} />
    </div>
  );
}
