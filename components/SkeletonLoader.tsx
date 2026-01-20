// components/SkeletonLoader.tsx

// This defines what ONE card looks like - it has 6 internal sections
// in services.tsx we do <SkeletonCard/> 3 times - for card 1 (shows all 6 sections)
// for card 2 (shows all 6 sections), for card 3 (shows all 6 sections) grey shimmers if(loading)
// this logic applies to all Skeleton cards below
export function SkeletonCard() {
    return (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-lg relative overflow-hidden">
            {/* Shimmer overlay */}
            <div className="absolute inset-0 animate-shimmer"></div>

            {/* Content */}
            <div className="relative flex flex-col items-center space-y-4">
                {/* Icon placeholder */}
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>

                {/* Title placeholder */}
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>

                {/* Description placeholder */}
                <div className="space-y-2 w-full">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6 animate-pulse"></div>
                </div>

                {/* Button placeholder */}
                <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-full mt-4 animate-pulse"></div>
            </div>
        </div>
    );
}

export function SkeletonBlogCard() {
    return (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg relative">
            {/* Shimmer overlay */}
            <div className="absolute inset-0 animate-shimmer z-10"></div>

            {/* Content */}
            <div className="relative">
                {/* Image placeholder */}
                <div className="h-48 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>

                <div className="p-6 space-y-4">
                    {/* Category badge */}
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-24 animate-pulse"></div>

                    {/* Title */}
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                    </div>

                    {/* Meta info */}
                    <div className="flex gap-4">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SkeletonSocialCard() {
    return (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-lg relative overflow-hidden">
            {/* Shimmer overlay */}
            <div className="absolute inset-0 animate-shimmer"></div>

            {/* Content */}
            <div className="relative space-y-4">
                {/* Platform badge */}
                <div className="flex items-center gap-3">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-24 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6 animate-pulse"></div>
                </div>

                {/* Stats */}
                <div className="flex gap-4">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}

export function SkeletonSkillsCard() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg relative overflow-hidden">
            {/* Shimmer overlay */}
            <div className="absolute inset-0 animate-shimmer"></div>

            {/* Content */}
            <div className="relative">
                {/* Category title */}
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-6 animate-pulse"></div>

                {/* Skills */}
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i}>
                            <div className="flex justify-between mb-2">
                                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
                            </div>
                            <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function SkeletonProjectCard() {
    return (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg relative">
            {/* Shimmer overlay */}
            <div className="absolute inset-0 animate-shimmer z-10"></div>

            {/* Content */}
            <div className="relative">
                {/* Image placeholder */}
                <div className="h-48 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>

                <div className="p-6 space-y-4">
                    {/* Title */}
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>

                    {/* Description */}
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                    </div>

                    {/* Tech stack */}
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>

                    {/* Links */}
                    <div className="flex gap-4">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SkeletonBlogPost() {
    return (
        <article className="min-h-screen bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Back button */}
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-8 animate-pulse"></div>

                {/* Featured image */}
                <div className="relative w-full h-96 bg-gray-300 dark:bg-gray-700 rounded-lg mb-8 animate-pulse"></div>

                {/* Category badge */}
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-32 mb-4 animate-pulse"></div>

                {/* Title */}
                <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>

                {/* Meta info */}
                <div className="flex gap-4 mb-8">
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                </div>

                {/* Content */}
                <div className="space-y-4 mb-12">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6 animate-pulse"></div>
                </div>

                {/* Tags */}
                <div className="flex gap-2 mb-12">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-20 animate-pulse"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-24 animate-pulse"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-16 animate-pulse"></div>
                </div>
            </div>
        </article>
    );
}
