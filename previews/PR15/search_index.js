var documenterSearchIndex = {"docs":
[{"location":"#MicroCollections.jl","page":"Home","title":"MicroCollections.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Pages = [\"index.md\"]","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [MicroCollections]\nPrivate = false","category":"page"},{"location":"#MicroCollections.MicroCollections","page":"Home","title":"MicroCollections.MicroCollections","text":"MicroCollections\n\n(Image: Dev) (Image: GitHub Actions)\n\nMicroCollections.jl provides immutable empty and singleton collections.\n\njulia> using MicroCollections\n\njulia> vec0()  # or EmptyVector()\n0-element EmptyVector{Union{}}\n\njulia> vec0(Int)  # or EmptyVector{Int}()\n0-element EmptyVector{Int64}\n\njulia> vec1(1)  # or SingletonVector((1,))\n1-element SingletonVector{Int64}:\n 1\n\njulia> EmptyDict()\nEmptyDict{Union{},Union{}}()\n\njulia> EmptyDict{Symbol,Char}()\nEmptyDict{Symbol,Char}()\n\njulia> SingletonDict(:a => 0)\nSingletonDict{Symbol,Int64} with 1 entry:\n  :a => 0\n\njulia> EmptySet()\nEmptySet{Union{}}()\n\njulia> EmptySet{Int64}()\nEmptySet{Int64}()\n\njulia> SingletonSet((1,))\nSingletonSet{Int64} with 1 element:\n  1\n\nWith BangBang.jl, MicroCollections.jl is useful for constructing singleton solutions that can be combined with a reduce:\n\njulia> using BangBang.Experimental: mergewith!!\n\njulia> @assert mapreduce(\n           x -> SingletonDict(abs(x) % 10 => 1), mergewith!!(+), 1:1000,\n       ) == Dict(\n           0 => 100,\n           1 => 100,\n           2 => 100,\n           3 => 100,\n           4 => 100,\n           5 => 100,\n           6 => 100,\n           7 => 100,\n           8 => 100,\n           9 => 100,\n       )\n\n\n\n\n\n","category":"module"},{"location":"#MicroCollections.EmptyDict","page":"Home","title":"MicroCollections.EmptyDict","text":"EmptyDict() :: AbstractDict{Union{},Union{}}\nEmptyDict(itr) :: AbstractDict\nEmptyDict{K,V}() :: AbstractDict{K,V}\nEmptyDict{K,V}(itr) :: AbstractDict{K,V}\n\n\n\n\n\n","category":"type"},{"location":"#MicroCollections.EmptySet","page":"Home","title":"MicroCollections.EmptySet","text":"EmptySet() :: AbstractSet{Union{}}\nEmptySet{T}() :: AbstractSet{T}\n\n\n\n\n\n","category":"type"},{"location":"#MicroCollections.EmptyVector","page":"Home","title":"MicroCollections.EmptyVector","text":"EmptyVector() :: AbstractVector{Union{}}\nEmptyVector(itr) :: AbstractVector\nEmptyVector{T}() :: AbstractVector{T}\nEmptyVector{T}(itr) :: AbstractVector{T}\n\nCreate an empty vector.  Iterator itr must be empty.\n\nThe unary constructors EmptyVector(itr) and EmptyVector{T}(itr) asserts that the iterator itr is empty.  The constructor EmptyVector(itr) uses eltype(itr) if IteratorEltype(itr) is HasEltype.\n\n\n\n\n\n","category":"type"},{"location":"#MicroCollections.OneHotArray","page":"Home","title":"MicroCollections.OneHotArray","text":"OneHotArray(index => value, shape) -> array::AbstractArray\n\nCreate an array such that isequal(array[index], value).  The values at indices other than index are undefined.\n\nCurrently, this array type is likely only useful as the second argument to BangBang.Extras.broadcast_inplace!! and as the input argument to FLoops.jl's  @reduce\n\nExamples\n\njulia> using MicroCollections, BangBang.Extras\n\njulia> broadcast_inplace!!(+, ones(Int64, 4), OneHotVector(2 => 3, 4))\n4-element Vector{Int64}:\n 1\n 4\n 1\n 1\n\njulia> using InitialValues\n\njulia> broadcast_inplace!!(+, InitialValue(+), OneHotVector(2 => 3, 4))\n4-element Vector{Int64}:\n 0\n 3\n 0\n 0\n\n\n\n\n\n","category":"type"},{"location":"#MicroCollections.SingletonDict","page":"Home","title":"MicroCollections.SingletonDict","text":"SingletonDict(k => v) :: AbstractDict\nSingletonDict(itr) :: AbstractDict\nSingletonDict{K,V}(k => v) :: AbstractDict{K,V}\nSingletonDict{K,V}(itr) :: AbstractDict{K,V}\n\n\n\n\n\n","category":"type"},{"location":"#MicroCollections.SingletonSet","page":"Home","title":"MicroCollections.SingletonSet","text":"SingletonSet(itr) :: AbstractSet\nSingletonSet{T}(itr) :: AbstractSet{T}\n\n\n\n\n\n","category":"type"},{"location":"#MicroCollections.SingletonVector","page":"Home","title":"MicroCollections.SingletonVector","text":"SingletonVector(itr) :: AbstractVector\nSingletonVector{T}(itr) :: AbstractVector{T}\n\nCreate a singleton vector.  Iterator itr must have one and only one element.\n\nThe constructor SingletonVector(itr) uses eltype(itr) if IteratorEltype(itr) is HasEltype.\n\n\n\n\n\n","category":"type"},{"location":"#MicroCollections.UndefArray","page":"Home","title":"MicroCollections.UndefArray","text":"UndefArray(size [, factory])\nUndefArray{T}(size [, factory])\nUndefArray{T,N}(size [, factory])\n\nExamples\n\njulia> using MicroCollections\n\njulia> UndefArray((2,))\n2-element UndefVector{Union{}}(2):\n #undef\n #undef\n\njulia> UndefArray{Int}((2, 3))\n2×3 UndefArray{2,Int64}((2, 3)):\n #undef  #undef  #undef\n #undef  #undef  #undef\n\nThe size of an UndefArray can be \"changed\" by using Setfield.@set\n\njulia> using Setfield\n\njulia> x = UndefArray((2,))\n2-element UndefVector{Union{}}(2):\n #undef\n #undef\n\njulia> @set size(x) = (1, 3)\n1×3 UndefArray{2,Union{}}((1, 3)):\n #undef  #undef  #undef\n\n\n\n\n\n","category":"type"},{"location":"#MicroCollections.UndefVector","page":"Home","title":"MicroCollections.UndefVector","text":"UndefVector(length)\n\nExamples\n\njulia> using MicroCollections\n\njulia> UndefVector(3)\n3-element UndefVector{Union{}}(3):\n #undef\n #undef\n #undef\n\n\n\n\n\n","category":"type"},{"location":"#MicroCollections.emptyshim","page":"Home","title":"MicroCollections.emptyshim","text":"emptyshim(ContainerType)\nemptyshim(ContainerType, ElementType)\n\nCreate an empty \"shim\" container that is widen to ContainerType when appending elements to it.  Default ElementType is Union{}.\n\nExamples\n\njulia> using MicroCollections, BangBang\n\njulia> @assert append!!(emptyshim(Vector), [0]) == [0]\n\njulia> @assert merge!!(emptyshim(Dict), Dict(:a => 1)) == Dict(:a => 1)\n\njulia> @assert union!!(emptyshim(Set), Set([0])) == Set([0])\n\n\n\n\n\n","category":"function"},{"location":"#MicroCollections.singletonshim","page":"Home","title":"MicroCollections.singletonshim","text":"singletonshim(ContainerType, x)\n\nCreate a \"shim\" container with one element x that is widen to ContainerType when appending elements to it.\n\nExamples\n\njulia> using MicroCollections, BangBang\n\njulia> @assert push!!(singletonshim(BitVector, false), true)::BitArray == [false, true]\n\n\n\n\n\n","category":"function"},{"location":"#MicroCollections.vec0","page":"Home","title":"MicroCollections.vec0","text":"vec0(T::Type = Union{})\n\nCreate an empty vector shim of element type T.\n\n\n\n\n\n","category":"function"},{"location":"#MicroCollections.vec1","page":"Home","title":"MicroCollections.vec1","text":"vec1(x)\n\nCreate a singleton vector with element x.\n\n\n\n\n\n","category":"function"},{"location":"internals/#Internals","page":"Internals","title":"Internals","text":"","category":"section"},{"location":"internals/","page":"Internals","title":"Internals","text":"Modules = [MicroCollections]\nPublic = false","category":"page"},{"location":"internals/#MicroCollections.dict0","page":"Internals","title":"MicroCollections.dict0","text":"dict0(T::Type = Pair{Union{},Union{}})\n\nCreate an empty dict shim of element type T.\n\n\n\n\n\n","category":"function"},{"location":"internals/#MicroCollections.dict1","page":"Internals","title":"MicroCollections.dict1","text":"dict1(k => v)\n\nCreate a singleton dict with key k and value v.\n\n\n\n\n\n","category":"function"},{"location":"internals/#MicroCollections.set0","page":"Internals","title":"MicroCollections.set0","text":"set0(T::Type = Union{})\n\nCreate an empty set shim of element type T.\n\n\n\n\n\n","category":"function"},{"location":"internals/#MicroCollections.set1","page":"Internals","title":"MicroCollections.set1","text":"set1(x)\n\nCreate a singleton set with element x.\n\n\n\n\n\n","category":"function"},{"location":"internals/#MicroCollections.upcast","page":"Internals","title":"MicroCollections.upcast","text":"MicroCollections.upcast(singleton_container::C) -> container::C\n\n\n\n\n\n","category":"function"}]
}
