const h=`
cout|v|iostream|std::ostream cout|The screen. Send values to it with <<.
cin|v|iostream|std::istream cin|The keyboard. Read values from it with >>.
cerr|v|iostream|std::ostream cerr|Error output: for messages to the programmer, shown at once.
clog|v|iostream|std::ostream clog|Log output.
endl|m|iostream|std::endl|Ends the line and forces the output to be written. Prefer '\\n'.
flush|m|iostream|std::flush|Forces buffered output to be written now.
ws|m|iostream|std::ws|Skips whitespace in input. Used before std::getline.
boolalpha|m|iostream|std::boolalpha|Prints bool as true / false instead of 1 / 0.
noboolalpha|m|iostream|std::noboolalpha|Prints bool as 1 / 0 again.
hex|m|iostream|std::hex|Prints integers in base 16.
dec|m|iostream|std::dec|Prints integers in base 10.
oct|m|iostream|std::oct|Prints integers in base 8.
fixed|m|iostream|std::fixed|Fixed number of digits after the decimal point (with setprecision).
scientific|m|iostream|std::scientific|Exponent notation.
left|m|iostream|std::left|Left-aligns within the field width.
right|m|iostream|std::right|Right-aligns within the field width.
showpos|m|iostream|std::showpos|Shows a + on positive numbers.
showbase|m|iostream|std::showbase|Shows 0x / 0 prefixes.
uppercase|m|iostream|std::uppercase|Upper-case hex digits and exponents.
setw|f|iomanip|setw(int width)|Minimum width of the next item printed.
setprecision|f|iomanip|setprecision(int digits)|Digits shown for floating-point numbers.
setfill|f|iomanip|setfill(char c)|Padding character used with setw.
quoted|f|iomanip|quoted(const std::string& s)|Reads or writes a string in quotes.
string|c|string|class std::string|Text that owns its characters and can change.
wstring|c|string|class std::wstring|A string of wide characters.
getline|f|string|std::istream& getline(std::istream& in, std::string& line)|Reads a whole line of text.
to_string|f|string|std::string to_string(number)|Converts a number to text.
stoi|f|string|int stoi(const std::string& text)|Converts text to an int. Throws if it is not a number.
stol|f|string|long stol(const std::string& text)|Converts text to a long.
stoll|f|string|long long stoll(const std::string& text)|Converts text to a long long.
stod|f|string|double stod(const std::string& text)|Converts text to a double.
stof|f|string|float stof(const std::string& text)|Converts text to a float.
string_view|c|string_view|class std::string_view|A read-only view of text owned elsewhere. Cheap to pass.
vector|c|vector|template class std::vector<T>|A resizable list stored in one block of memory. The default container.
array|c|array|template class std::array<T, N>|A fixed-size array whose length is part of its type.
deque|c|deque|template class std::deque<T>|A list that is fast to grow at both ends.
list|c|list|template class std::list<T>|A doubly linked list.
forward_list|c|forward_list|template class std::forward_list<T>|A singly linked list.
map|c|map|template class std::map<Key, Value>|Key to value pairs, kept sorted by key.
multimap|c|map|template class std::multimap<Key, Value>|A map that allows repeated keys.
unordered_map|c|unordered_map|template class std::unordered_map<Key, Value>|Key to value pairs in a hash table. Fast lookup, no order.
set|c|set|template class std::set<T>|Unique values, kept sorted.
multiset|c|set|template class std::multiset<T>|A set that allows repeats.
unordered_set|c|unordered_set|template class std::unordered_set<T>|Unique values in a hash table.
stack|c|stack|template class std::stack<T>|Last in, first out.
queue|c|queue|template class std::queue<T>|First in, first out.
priority_queue|c|queue|template class std::priority_queue<T>|Always gives the largest element next.
span|c|span|template class std::span<T>|A view of a run of elements: a pointer and a length.
bitset|c|bitset|template class std::bitset<N>|A fixed number of bits with set / test / flip.
pair|c|utility|template struct std::pair<A, B>|Two values: first and second.
tuple|c|tuple|template class std::tuple<Ts...>|Several values of different types.
optional|c|optional|template class std::optional<T>|Either a T or nothing.
nullopt|k|optional|std::nullopt|The empty state of an optional.
variant|c|variant|template class std::variant<Ts...>|Exactly one of several types.
visit|f|variant|decltype(auto) visit(Visitor&& v, Variant&& var)|Calls the visitor with whatever the variant holds.
holds_alternative|f|variant|bool holds_alternative<T>(const variant& v)|Whether the variant currently holds a T.
get|f|variant|T& get<T>(variant& v)|The value held, as a T. Throws if it holds something else.
get_if|f|variant|T* get_if<T>(variant* v)|A pointer to the value if it is a T, otherwise nullptr.
any|c|any|class std::any|Holds a value of any copyable type.
expected|c|expected|template class std::expected<T, E>|Either a value or an error.
unexpected|c|expected|template class std::unexpected<E>|Wraps an error for returning from a function that returns expected.
unique_ptr|c|memory|template class std::unique_ptr<T>|Owns one heap object and deletes it automatically. Cannot be copied.
shared_ptr|c|memory|template class std::shared_ptr<T>|Shared ownership by reference counting.
weak_ptr|c|memory|template class std::weak_ptr<T>|Observes a shared object without owning it.
make_unique|f|memory|std::unique_ptr<T> make_unique<T>(args...)|Creates a heap object owned by a unique_ptr.
make_shared|f|memory|std::shared_ptr<T> make_shared<T>(args...)|Creates a heap object owned by a shared_ptr.
construct_at|f|memory|T* construct_at(T* where, args...)|Constructs an object in memory you already have.
destroy_at|f|memory|void destroy_at(T* object)|Runs an object's destructor without freeing memory.
move|f|utility|T&& move(T& value)|Marks a value as movable: its contents may be taken.
forward|f|utility|T&& forward<T>(T& value)|Passes an argument on exactly as it was received.
swap|f|utility|void swap(T& a, T& b)|Exchanges two values.
exchange|f|utility|T exchange(T& object, U&& newValue)|Stores a new value and returns the old one.
as_const|f|utility|const T& as_const(T& value)|A const view of a value.
size_t|c|cstddef|std::size_t|The unsigned type used for sizes and indexes.
ptrdiff_t|c|cstddef|std::ptrdiff_t|The signed type for the distance between two positions.
byte|c|cstddef|enum class std::byte|One raw byte, not a character or a number.
nullptr_t|c|cstddef|std::nullptr_t|The type of nullptr.
int8_t|c|cstdint|std::int8_t|Signed integer, exactly 8 bits.
int16_t|c|cstdint|std::int16_t|Signed integer, exactly 16 bits.
int32_t|c|cstdint|std::int32_t|Signed integer, exactly 32 bits.
int64_t|c|cstdint|std::int64_t|Signed integer, exactly 64 bits.
uint8_t|c|cstdint|std::uint8_t|Unsigned integer, exactly 8 bits.
uint16_t|c|cstdint|std::uint16_t|Unsigned integer, exactly 16 bits.
uint32_t|c|cstdint|std::uint32_t|Unsigned integer, exactly 32 bits.
uint64_t|c|cstdint|std::uint64_t|Unsigned integer, exactly 64 bits.
uintptr_t|c|cstdint|std::uintptr_t|An unsigned integer wide enough to hold an address.
numeric_limits|c|limits|template class std::numeric_limits<T>|The limits of a number type: max(), min(), lowest().
sort|f|algorithm|void sort(first, last [, compare])|Sorts a range.
stable_sort|f|algorithm|void stable_sort(first, last [, compare])|Sorts, keeping equal elements in their original order.
find|f|algorithm|iterator find(first, last, const T& value)|The first element equal to value, or last.
find_if|f|algorithm|iterator find_if(first, last, predicate)|The first element satisfying the predicate, or last.
count|f|algorithm|count(first, last, const T& value)|How many elements equal value.
count_if|f|algorithm|count_if(first, last, predicate)|How many elements satisfy the predicate.
all_of|f|algorithm|bool all_of(first, last, predicate)|True if every element satisfies the predicate.
any_of|f|algorithm|bool any_of(first, last, predicate)|True if at least one element satisfies the predicate.
none_of|f|algorithm|bool none_of(first, last, predicate)|True if no element satisfies the predicate.
for_each|f|algorithm|for_each(first, last, function)|Calls a function with every element.
transform|f|algorithm|transform(first, last, output, function)|Writes function(element) for every element.
copy|f|algorithm|copy(first, last, output)|Copies a range.
copy_if|f|algorithm|copy_if(first, last, output, predicate)|Copies the elements that satisfy the predicate.
fill|f|algorithm|void fill(first, last, const T& value)|Sets every element to value.
reverse|f|algorithm|void reverse(first, last)|Reverses the order of a range.
rotate|f|algorithm|rotate(first, middle, last)|Rotates a range so middle becomes first.
unique|f|algorithm|iterator unique(first, last)|Moves adjacent duplicates to the end. Returns where they start.
remove|f|algorithm|iterator remove(first, last, const T& value)|Moves matching elements to the end. Returns where they start.
remove_if|f|algorithm|iterator remove_if(first, last, predicate)|Moves matching elements to the end.
replace|f|algorithm|void replace(first, last, const T& from, const T& to)|Replaces every from with to.
min|f|algorithm|const T& min(const T& a, const T& b)|The smaller of two values.
max|f|algorithm|const T& max(const T& a, const T& b)|The larger of two values.
minmax|f|algorithm|pair minmax(const T& a, const T& b)|The smaller and the larger.
clamp|f|algorithm|const T& clamp(const T& value, const T& low, const T& high)|Keeps a value within a range.
min_element|f|algorithm|iterator min_element(first, last)|An iterator to the smallest element.
max_element|f|algorithm|iterator max_element(first, last)|An iterator to the largest element.
binary_search|f|algorithm|bool binary_search(first, last, const T& value)|Whether a sorted range contains value.
lower_bound|f|algorithm|iterator lower_bound(first, last, const T& value)|The first element not less than value, in a sorted range.
upper_bound|f|algorithm|iterator upper_bound(first, last, const T& value)|The first element greater than value, in a sorted range.
is_sorted|f|algorithm|bool is_sorted(first, last)|Whether a range is in order.
is_permutation|f|algorithm|bool is_permutation(first1, last1, first2)|Whether two ranges hold the same elements.
shuffle|f|algorithm|void shuffle(first, last, engine)|Puts a range in random order.
next_permutation|f|algorithm|bool next_permutation(first, last)|Rearranges into the next ordering.
equal|f|algorithm|bool equal(first1, last1, first2)|Whether two ranges are equal.
erase|f|vector|erase(container, const T& value)|Removes every element equal to value from a container.
erase_if|f|vector|erase_if(container, predicate)|Removes every element satisfying the predicate.
accumulate|f|numeric|T accumulate(first, last, T init)|Adds up a range, left to right.
reduce|f|numeric|T reduce([policy,] first, last [, init])|Adds up a range in any order; can run in parallel.
transform_reduce|f|numeric|T transform_reduce([policy,] first, last, init, combine, transform)|Transforms each element, then combines.
iota|f|numeric|void iota(first, last, T start)|Fills a range with start, start + 1, start + 2, ...
gcd|f|numeric|gcd(a, b)|Greatest common divisor.
lcm|f|numeric|lcm(a, b)|Least common multiple.
midpoint|f|numeric|midpoint(a, b)|Half-way between two values, without overflow.
begin|f|iterator|begin(container)|An iterator to the first element.
end|f|iterator|end(container)|The position one past the last element.
size|f|iterator|size(container)|The number of elements.
ssize|f|iterator|ssize(container)|The number of elements, as a signed number.
distance|f|iterator|distance(first, last)|How many steps from first to last.
next|f|iterator|next(iterator [, n])|The iterator n steps on.
prev|f|iterator|prev(iterator [, n])|The iterator n steps back.
advance|f|iterator|void advance(iterator& it, n)|Moves an iterator n steps.
back_inserter|f|iterator|back_inserter(container)|An output iterator that calls push_back.
abs|f|cmath|abs(x)|The size of a number without its sign.
sqrt|f|cmath|double sqrt(double x)|Square root.
pow|f|cmath|double pow(double base, double exponent)|base raised to exponent.
round|f|cmath|double round(double x)|Rounds to the nearest whole number.
floor|f|cmath|double floor(double x)|Rounds down.
ceil|f|cmath|double ceil(double x)|Rounds up.
trunc|f|cmath|double trunc(double x)|Cuts off the decimals.
fmod|f|cmath|double fmod(double x, double y)|Remainder of floating-point division.
hypot|f|cmath|double hypot(double x, double y)|sqrt(x*x + y*y).
sin|f|cmath|double sin(double radians)|Sine.
cos|f|cmath|double cos(double radians)|Cosine.
tan|f|cmath|double tan(double radians)|Tangent.
atan2|f|cmath|double atan2(double y, double x)|The angle of the point (x, y).
exp|f|cmath|double exp(double x)|e raised to x.
log|f|cmath|double log(double x)|Natural logarithm.
log2|f|cmath|double log2(double x)|Logarithm base 2.
log10|f|cmath|double log10(double x)|Logarithm base 10.
isnan|f|cmath|bool isnan(double x)|Whether x is not-a-number.
isinf|f|cmath|bool isinf(double x)|Whether x is infinite.
lerp|f|cmath|double lerp(double a, double b, double t)|The point a fraction t of the way from a to b.
isdigit|f|cctype|int isdigit(int c)|Whether a character is a digit.
isalpha|f|cctype|int isalpha(int c)|Whether a character is a letter.
isalnum|f|cctype|int isalnum(int c)|Whether a character is a letter or digit.
isspace|f|cctype|int isspace(int c)|Whether a character is a space, tab or new line.
isupper|f|cctype|int isupper(int c)|Whether a character is an upper-case letter.
islower|f|cctype|int islower(int c)|Whether a character is a lower-case letter.
ispunct|f|cctype|int ispunct(int c)|Whether a character is punctuation.
toupper|f|cctype|int toupper(int c)|The upper-case form of a character.
tolower|f|cctype|int tolower(int c)|The lower-case form of a character.
exit|f|cstdlib|void exit(int code)|Ends the program now.
abort|f|cstdlib|void abort()|Ends the program immediately, with no clean-up.
strlen|f|cstring|std::size_t strlen(const char* text)|The length of a C-string.
strcmp|f|cstring|int strcmp(const char* a, const char* b)|Compares two C-strings. 0 means equal.
memcpy|f|cstring|void* memcpy(void* to, const void* from, std::size_t bytes)|Copies raw bytes.
function|c|functional|template class std::function<R(Args...)>|Holds anything callable with a matching signature.
move_only_function|c|functional|template class std::move_only_function<R(Args...)>|Like function, for callables that cannot be copied.
ref|f|functional|reference_wrapper<T> ref(T& value)|Passes a reference where a copy would be made.
cref|f|functional|reference_wrapper<const T> cref(const T& value)|Passes a const reference where a copy would be made.
reference_wrapper|c|functional|template class std::reference_wrapper<T>|A reference that can be stored in a container.
invoke|f|functional|invoke(callable, args...)|Calls anything callable.
greater|c|functional|struct std::greater<>|Compares with >. Pass to sort for descending order.
less|c|functional|struct std::less<>|Compares with <.
plus|c|functional|struct std::plus<>|Adds two values.
hash|c|functional|template struct std::hash<T>|Turns a value into a number for hash tables.
exception|c|exception|class std::exception|The base class of the standard exceptions.
runtime_error|c|stdexcept|class std::runtime_error|An error detectable only while running.
logic_error|c|stdexcept|class std::logic_error|An error in the program's logic.
invalid_argument|c|stdexcept|class std::invalid_argument|An argument was not acceptable.
out_of_range|c|stdexcept|class std::out_of_range|An index or key was outside the valid range.
domain_error|c|stdexcept|class std::domain_error|A value outside a function's domain.
length_error|c|stdexcept|class std::length_error|Something would exceed its maximum size.
overflow_error|c|stdexcept|class std::overflow_error|An arithmetic overflow.
bad_alloc|c|new|class std::bad_alloc|Thrown when new cannot obtain memory.
nothrow|k|new|std::nothrow|Makes new return nullptr on failure instead of throwing.
terminate|f|exception|void terminate()|Ends the program after an unhandled exception.
current_exception|f|exception|exception_ptr current_exception()|The exception being handled.
ifstream|c|fstream|class std::ifstream|Reads from a file.
ofstream|c|fstream|class std::ofstream|Writes to a file.
fstream|c|fstream|class std::fstream|Reads and writes a file.
stringstream|c|sstream|class std::stringstream|Reads from and writes to a string in memory.
istringstream|c|sstream|class std::istringstream|Reads values out of a string.
ostringstream|c|sstream|class std::ostringstream|Builds a string with <<.
ostream|c|ostream|class std::ostream|Any output stream: screen, file or string.
istream|c|istream|class std::istream|Any input stream.
streamsize|c|ios|std::streamsize|The type for counts of characters in streams.
ios|c|ios|class std::ios|Holds the stream flags: std::ios::app, binary, in, out.
format|f|format|std::string format(format_string, args...)|Builds a string from {} placeholders.
formatter|c|format|template struct std::formatter<T>|Specialize this to make your own type formattable.
format_to|f|format|format_to(output, format_string, args...)|Formats straight into an output iterator.
print|f|print|void print(format_string, args...)|Prints formatted text.
println|f|print|void println(format_string, args...)|Prints formatted text and ends the line.
mt19937|c|random|class std::mt19937|A good general-purpose random engine. Create one and keep it.
random_device|c|random|class std::random_device|An unpredictable seed from the operating system.
uniform_int_distribution|c|random|template class std::uniform_int_distribution<Int>|Whole numbers in a range, each equally likely.
uniform_real_distribution|c|random|template class std::uniform_real_distribution<Real>|Decimal numbers in a range.
bernoulli_distribution|c|random|class std::bernoulli_distribution|true or false with a given probability.
normal_distribution|c|random|template class std::normal_distribution<Real>|A bell curve.
thread|c|thread|class std::thread|A thread. Must be joined before it is destroyed.
jthread|c|thread|class std::jthread|A thread that joins automatically and can be asked to stop.
this_thread|n|thread|namespace std::this_thread|Functions that act on the current thread.
stop_token|c|stop_token|class std::stop_token|Lets a thread see that it has been asked to stop.
mutex|c|mutex|class std::mutex|Lets one thread at a time into a critical section.
lock_guard|c|mutex|template class std::lock_guard<Mutex>|Locks a mutex for the current scope.
scoped_lock|c|mutex|template class std::scoped_lock<Mutexes...>|Locks several mutexes together, without deadlock.
unique_lock|c|mutex|template class std::unique_lock<Mutex>|A lock that can be released early or moved.
shared_mutex|c|shared_mutex|class std::shared_mutex|Many readers or one writer.
shared_lock|c|shared_mutex|template class std::shared_lock<Mutex>|A reader's lock on a shared_mutex.
condition_variable|c|condition_variable|class std::condition_variable|Lets a thread sleep until notified.
atomic|c|atomic|template struct std::atomic<T>|A value whose operations are indivisible.
atomic_flag|c|atomic|struct std::atomic_flag|A lock-free boolean flag.
future|c|future|template class std::future<T>|A result that will be ready later.
promise|c|future|template class std::promise<T>|The writing end of a future.
async|f|future|std::future<R> async(std::launch policy, function, args...)|Runs a function, possibly on another thread.
launch|c|future|enum class std::launch|async or deferred.
packaged_task|c|future|template class std::packaged_task<R(Args...)>|A callable whose result goes to a future.
latch|c|latch|class std::latch|A one-shot countdown that threads can wait on.
barrier|c|barrier|template class std::barrier<F>|A reusable meeting point for threads.
counting_semaphore|c|semaphore|template class std::counting_semaphore<N>|Limits how many threads use something.
binary_semaphore|c|semaphore|std::binary_semaphore|A semaphore with one permit.
generator|c|generator|template class std::generator<T>|A coroutine that yields a sequence of values.
chrono|n|chrono|namespace std::chrono|Durations, clocks and time points.
filesystem|n|filesystem|namespace std::filesystem|Paths, directories and file information.
ranges|n|ranges|namespace std::ranges|Algorithms that take a whole container.
views|n|ranges|namespace std::views|Lazy pipelines: filter, transform, take ...
execution|n|execution|namespace std::execution|Policies for parallel algorithms: seq, par, par_unseq.
numbers|n|numbers|namespace std::numbers|Mathematical constants: pi, e, sqrt2.
literals|n|string|namespace std::literals|The standard literal suffixes: "text"s, 10ms.
integral|c|concepts|concept std::integral<T>|T is a whole-number type.
floating_point|c|concepts|concept std::floating_point<T>|T is a floating-point type.
same_as|c|concepts|concept std::same_as<T, U>|T and U are the same type.
convertible_to|c|concepts|concept std::convertible_to<From, To>|From converts to To.
derived_from|c|concepts|concept std::derived_from<D, B>|D is derived from B.
invocable|c|concepts|concept std::invocable<F, Args...>|F can be called with Args.
predicate|c|concepts|concept std::predicate<F, Args...>|F can be called and returns something like bool.
totally_ordered|c|concepts|concept std::totally_ordered<T>|T supports < > <= >=.
equality_comparable|c|concepts|concept std::equality_comparable<T>|T supports ==.
is_same_v|k|type_traits|bool is_same_v<T, U>|Whether two types are the same.
is_integral_v|k|type_traits|bool is_integral_v<T>|Whether T is a whole-number type.
is_floating_point_v|k|type_traits|bool is_floating_point_v<T>|Whether T is a floating-point type.
is_arithmetic_v|k|type_traits|bool is_arithmetic_v<T>|Whether T is a number type.
is_pointer_v|k|type_traits|bool is_pointer_v<T>|Whether T is a pointer.
is_trivially_copyable_v|k|type_traits|bool is_trivially_copyable_v<T>|Whether T can be copied as raw bytes.
remove_cvref_t|c|type_traits|remove_cvref_t<T>|T without const, volatile or a reference.
decay_t|c|type_traits|decay_t<T>|The type T becomes when passed by value.
enable_if_t|c|type_traits|enable_if_t<bool Condition, T = void>|T if the condition is true; otherwise no type (SFINAE).
conditional_t|c|type_traits|conditional_t<bool Condition, A, B>|A if true, otherwise B.
invoke_result_t|c|type_traits|invoke_result_t<F, Args...>|What calling F with Args returns.
true_type|c|type_traits|struct std::true_type|A type whose value is true.
false_type|c|type_traits|struct std::false_type|A type whose value is false.
index_sequence|c|utility|template struct std::index_sequence<Is...>|A compile-time list of indexes.
make_index_sequence|c|utility|make_index_sequence<N>|index_sequence<0, 1, ..., N-1>.
initializer_list|c|initializer_list|template class std::initializer_list<T>|What a braced list { 1, 2, 3 } is passed as.
source_location|c|source_location|struct std::source_location|The file and line of the calling code.
bit_cast|f|bit|To bit_cast<To>(const From& value)|Reinterprets the bits of one type as another, safely.
byteswap|f|bit|T byteswap(T value)|Reverses the order of the bytes.
endian|c|bit|enum class std::endian|little, big and native.
tie|f|tuple|tuple<Ts&...> tie(Ts&... values)|A tuple of references: for comparing or unpacking several values.
make_pair|f|utility|pair<A, B> make_pair(A a, B b)|Makes a pair.
make_tuple|f|tuple|tuple<Ts...> make_tuple(Ts... values)|Makes a tuple.
apply|f|tuple|apply(function, tuple)|Calls a function with a tuple's elements as arguments.
from_chars|f|charconv|from_chars(const char* first, const char* last, T& value)|Parses a number without throwing.
to_chars|f|charconv|to_chars(char* first, char* last, T value)|Writes a number as characters.
assert|f|cassert|assert(condition)|Stops the program if the condition is false (Debug builds only).
`,u=`
chrono|seconds|c|std::chrono::seconds|A number of seconds.
chrono|milliseconds|c|std::chrono::milliseconds|A number of milliseconds.
chrono|microseconds|c|std::chrono::microseconds|A number of microseconds.
chrono|nanoseconds|c|std::chrono::nanoseconds|A number of nanoseconds.
chrono|minutes|c|std::chrono::minutes|A number of minutes.
chrono|hours|c|std::chrono::hours|A number of hours.
chrono|days|c|std::chrono::days|A number of days.
chrono|duration|c|std::chrono::duration<Rep, Period>|A length of time.
chrono|duration_cast|f|To duration_cast<To>(duration d)|Converts a duration to a coarser unit, cutting off the rest.
chrono|steady_clock|c|std::chrono::steady_clock|A clock that never jumps. Use it to measure time.
chrono|system_clock|c|std::chrono::system_clock|The calendar clock.
chrono|high_resolution_clock|c|std::chrono::high_resolution_clock|The clock with the finest tick.
chrono|time_point|c|std::chrono::time_point<Clock>|A moment on a clock.
chrono|year_month_day|c|std::chrono::year_month_day|A calendar date.
chrono|sys_days|c|std::chrono::sys_days|A date as a time point, for arithmetic.
chrono|weekday|c|std::chrono::weekday|A day of the week.
this_thread|sleep_for|f|void sleep_for(duration d)|Pauses the current thread.
this_thread|sleep_until|f|void sleep_until(time_point t)|Pauses the current thread until a moment.
this_thread|get_id|f|std::thread::id get_id()|Identifies the current thread.
this_thread|yield|f|void yield()|Lets other threads run.
filesystem|path|c|class std::filesystem::path|A file path that understands its parts.
filesystem|exists|f|bool exists(const path& p)|Whether a file or directory exists.
filesystem|create_directories|f|bool create_directories(const path& p)|Creates a directory and its parents.
filesystem|file_size|f|std::uintmax_t file_size(const path& p)|The size of a file in bytes.
filesystem|remove|f|bool remove(const path& p)|Deletes a file or empty directory.
filesystem|rename|f|void rename(const path& from, const path& to)|Renames or moves.
filesystem|copy_file|f|bool copy_file(const path& from, const path& to)|Copies a file.
filesystem|current_path|f|path current_path()|The working directory.
filesystem|directory_iterator|c|class std::filesystem::directory_iterator|Walks the entries of one directory.
filesystem|recursive_directory_iterator|c|class std::filesystem::recursive_directory_iterator|Walks a directory and everything below it.
filesystem|is_directory|f|bool is_directory(const path& p)|Whether the path is a directory.
ranges|sort|f|void ranges::sort(range [, compare, projection])|Sorts a whole container.
ranges|find|f|iterator ranges::find(range, value [, projection])|The first element equal to value.
ranges|find_if|f|iterator ranges::find_if(range, predicate)|The first element satisfying the predicate.
ranges|count|f|ranges::count(range, value)|How many elements equal value.
ranges|count_if|f|ranges::count_if(range, predicate)|How many elements satisfy the predicate.
ranges|any_of|f|bool ranges::any_of(range, predicate)|True if any element satisfies the predicate.
ranges|all_of|f|bool ranges::all_of(range, predicate)|True if every element satisfies the predicate.
ranges|max_element|f|iterator ranges::max_element(range [, compare, projection])|An iterator to the largest element.
ranges|min_element|f|iterator ranges::min_element(range [, compare, projection])|An iterator to the smallest element.
ranges|minmax|f|ranges::minmax(range)|The smallest and largest values.
ranges|reverse|f|void ranges::reverse(range)|Reverses a container.
ranges|binary_search|f|bool ranges::binary_search(range, value)|Whether a sorted container holds value.
ranges|lower_bound|f|iterator ranges::lower_bound(range, value)|The first element not less than value.
ranges|to|f|ranges::to<Container>()|Collects a view into a container.
ranges|range_value_t|c|ranges::range_value_t<R>|The element type of a range.
views|filter|f|views::filter(predicate)|Keeps the elements that satisfy the predicate.
views|transform|f|views::transform(function)|Applies a function to each element.
views|take|f|views::take(n)|The first n elements.
views|drop|f|views::drop(n)|All but the first n elements.
views|take_while|f|views::take_while(predicate)|Elements until the predicate fails.
views|drop_while|f|views::drop_while(predicate)|Skips elements while the predicate holds.
views|reverse|k|views::reverse|Back to front.
views|iota|f|views::iota(first [, last])|Counts upwards, with no container.
views|keys|k|views::keys|The keys of a map.
views|values|k|views::values|The values of a map.
views|enumerate|k|views::enumerate|(index, element) pairs.
views|zip|f|views::zip(ranges...)|Elements of several ranges, paired up.
views|split|f|views::split(delimiter)|The pieces between delimiters.
views|join|k|views::join|Flattens a range of ranges.
views|chunk|f|views::chunk(n)|Groups of n elements.
execution|seq|k|std::execution::seq|Run sequentially.
execution|par|k|std::execution::par|Run on several threads.
execution|par_unseq|k|std::execution::par_unseq|Run on several threads and vectorize.
numbers|pi|k|inline constexpr double std::numbers::pi|3.14159...
numbers|e|k|inline constexpr double std::numbers::e|2.71828...
numbers|sqrt2|k|inline constexpr double std::numbers::sqrt2|1.41421...
`,m=`
seq|size|std::size_t size() const|The number of elements.
seq|empty|bool empty() const|Whether there are no elements.
seq|begin|iterator begin()|An iterator to the first element.
seq|end|iterator end()|The position one past the last element.
seq|front|T& front()|The first element. Undefined if empty.
seq|back|T& back()|The last element. Undefined if empty.
seq|clear|void clear()|Removes every element.
seq|at|T& at(std::size_t index)|Element at index, with a bounds check (throws std::out_of_range).
seq|data|T* data()|A pointer to the first element.
seq|rbegin|reverse_iterator rbegin()|Start of reverse iteration.
seq|rend|reverse_iterator rend()|End of reverse iteration.
seq|cbegin|const_iterator cbegin() const|A read-only begin.
seq|cend|const_iterator cend() const|A read-only end.
seq|swap|void swap(container& other)|Exchanges contents with another container.
vector|push_back|void push_back(const T& value)|Adds an element at the end.
vector|emplace_back|T& emplace_back(args...)|Constructs an element in place at the end.
vector|pop_back|void pop_back()|Removes the last element. Returns nothing.
vector|insert|iterator insert(iterator position, const T& value)|Inserts before a position.
vector|erase|iterator erase(iterator position)|Removes the element at a position.
vector|resize|void resize(std::size_t count)|Changes the number of elements.
vector|reserve|void reserve(std::size_t capacity)|Sets aside room, so later push_backs do not reallocate.
vector|capacity|std::size_t capacity() const|How many elements fit before more memory is needed.
vector|shrink_to_fit|void shrink_to_fit()|Asks to release unused capacity.
vector|assign|void assign(std::size_t count, const T& value)|Replaces the contents.
deque|push_back|void push_back(const T& value)|Adds an element at the end.
deque|push_front|void push_front(const T& value)|Adds an element at the front.
deque|pop_back|void pop_back()|Removes the last element.
deque|pop_front|void pop_front()|Removes the first element.
deque|insert|iterator insert(iterator position, const T& value)|Inserts before a position.
deque|erase|iterator erase(iterator position)|Removes the element at a position.
list|push_back|void push_back(const T& value)|Adds an element at the end.
list|push_front|void push_front(const T& value)|Adds an element at the front.
list|pop_back|void pop_back()|Removes the last element.
list|pop_front|void pop_front()|Removes the first element.
list|insert|iterator insert(iterator position, const T& value)|Inserts before a position.
list|erase|iterator erase(iterator position)|Removes the element at a position.
list|sort|void sort()|Sorts the list.
list|reverse|void reverse()|Reverses the list.
list|remove|void remove(const T& value)|Removes every element equal to value.
array|fill|void fill(const T& value)|Sets every element to value.
string|length|std::size_t length() const|The number of characters.
string|push_back|void push_back(char c)|Adds one character at the end.
string|pop_back|void pop_back()|Removes the last character.
string|append|std::string& append(const std::string& text)|Adds text at the end.
string|substr|std::string substr(std::size_t start, std::size_t count = npos) const|A copy of part of the string.
string|find|std::size_t find(const std::string& text, std::size_t from = 0) const|Where text first occurs, or std::string::npos.
string|rfind|std::size_t rfind(const std::string& text) const|Where text last occurs, or npos.
string|find_first_of|std::size_t find_first_of(const std::string& chars) const|The first position holding any of the characters.
string|find_first_not_of|std::size_t find_first_not_of(const std::string& chars) const|The first position holding none of the characters.
string|find_last_of|std::size_t find_last_of(const std::string& chars) const|The last position holding any of the characters.
string|insert|std::string& insert(std::size_t position, const std::string& text)|Inserts text at a position.
string|erase|std::string& erase(std::size_t start = 0, std::size_t count = npos)|Removes characters.
string|replace|std::string& replace(std::size_t start, std::size_t count, const std::string& text)|Replaces part of the string.
string|starts_with|bool starts_with(std::string_view prefix) const|Whether the string begins with prefix.
string|ends_with|bool ends_with(std::string_view suffix) const|Whether the string ends with suffix.
string|contains|bool contains(std::string_view text) const|Whether the string contains text.
string|compare|int compare(const std::string& other) const|Negative, zero or positive, like <=>.
string|c_str|const char* c_str() const|The text as a C-string, for C functions.
string|resize|void resize(std::size_t count)|Changes the length.
string|reserve|void reserve(std::size_t capacity)|Sets aside room.
string|capacity|std::size_t capacity() const|Room before reallocation.
string|npos|static const std::size_t npos|The "not found" value returned by find.
string_view|length|std::size_t length() const|The number of characters.
string_view|substr|std::string_view substr(std::size_t start, std::size_t count = npos) const|A view of part of the text.
string_view|find|std::size_t find(std::string_view text) const|Where text first occurs, or npos.
string_view|starts_with|bool starts_with(std::string_view prefix) const|Whether it begins with prefix.
string_view|ends_with|bool ends_with(std::string_view suffix) const|Whether it ends with suffix.
string_view|remove_prefix|void remove_prefix(std::size_t n)|Drops the first n characters from the view.
string_view|remove_suffix|void remove_suffix(std::size_t n)|Drops the last n characters from the view.
assoc|size|std::size_t size() const|The number of elements.
assoc|empty|bool empty() const|Whether there are no elements.
assoc|begin|iterator begin()|An iterator to the first element.
assoc|end|iterator end()|The position one past the last element.
assoc|clear|void clear()|Removes every element.
assoc|find|iterator find(const Key& key)|The element with that key, or end().
assoc|contains|bool contains(const Key& key) const|Whether the key is present.
assoc|count|std::size_t count(const Key& key) const|How many elements have that key.
assoc|erase|std::size_t erase(const Key& key)|Removes the element with that key.
assoc|insert|pair<iterator, bool> insert(const value_type& value)|Inserts if the key is absent.
assoc|emplace|pair<iterator, bool> emplace(args...)|Constructs an element in place if the key is absent.
map|at|Value& at(const Key& key)|The value for a key. Throws if the key is absent.
map|try_emplace|pair<iterator, bool> try_emplace(const Key& key, args...)|Inserts only if the key is absent.
map|insert_or_assign|pair<iterator, bool> insert_or_assign(const Key& key, Value value)|Inserts or overwrites.
map|lower_bound|iterator lower_bound(const Key& key)|The first element with a key not less than key.
map|upper_bound|iterator upper_bound(const Key& key)|The first element with a key greater than key.
set|lower_bound|iterator lower_bound(const T& value)|The first element not less than value.
set|upper_bound|iterator upper_bound(const T& value)|The first element greater than value.
pair|first|A first|The first value.
pair|second|B second|The second value.
optional|has_value|bool has_value() const|Whether a value is present.
optional|value|T& value()|The value. Throws std::bad_optional_access if empty.
optional|value_or|T value_or(T fallback) const|The value, or the fallback if empty.
optional|reset|void reset()|Makes it empty.
optional|emplace|T& emplace(args...)|Constructs a new value in place.
variant|index|std::size_t index() const|Which alternative is held.
variant|valueless_by_exception|bool valueless_by_exception() const|Whether it lost its value to an exception.
ptr|get|T* get() const|The raw pointer. Does not give up ownership.
ptr|reset|void reset(T* p = nullptr)|Deletes the object and takes a new one.
unique_ptr|release|T* release()|Gives up ownership and returns the raw pointer.
shared_ptr|use_count|long use_count() const|How many shared_ptr objects own this.
weak_ptr|lock|std::shared_ptr<T> lock() const|A shared_ptr to the object, or an empty one if it is gone.
weak_ptr|expired|bool expired() const|Whether the object has been destroyed.
stream|good|bool good() const|No error flags are set.
stream|fail|bool fail() const|The last operation failed.
stream|eof|bool eof() const|The end of the input was reached.
stream|clear|void clear()|Resets the error flags.
istream|ignore|std::istream& ignore(std::streamsize count, int delimiter)|Discards characters.
istream|get|int get()|Reads one character, including whitespace.
istream|peek|int peek()|Looks at the next character without reading it.
istream|unget|std::istream& unget()|Puts the last character back.
istream|read|std::istream& read(char* buffer, std::streamsize count)|Reads raw bytes.
istream|seekg|std::istream& seekg(position)|Moves the read position.
istream|tellg|position tellg()|The read position.
ostream|write|std::ostream& write(const char* buffer, std::streamsize count)|Writes raw bytes.
ostream|flush|std::ostream& flush()|Writes out buffered output.
ostream|seekp|std::ostream& seekp(position)|Moves the write position.
ostream|tellp|position tellp()|The write position.
ostream|precision|std::streamsize precision(std::streamsize digits)|Sets the number of digits printed.
file|open|void open(const std::string& path)|Opens a file.
file|close|void close()|Closes the file now.
file|is_open|bool is_open() const|Whether a file is open.
sstream|str|std::string str() const|The text built so far.
thread|join|void join()|Waits for the thread to finish.
thread|detach|void detach()|Lets the thread run on its own.
thread|joinable|bool joinable() const|Whether the thread can still be joined.
thread|get_id|std::thread::id get_id() const|The thread's id.
jthread|request_stop|bool request_stop()|Asks the thread to stop.
jthread|get_stop_token|std::stop_token get_stop_token()|The token the thread checks.
stop_token|stop_requested|bool stop_requested() const|Whether a stop has been asked for.
mutex|lock|void lock()|Locks. Prefer std::lock_guard.
mutex|unlock|void unlock()|Unlocks. Prefer std::lock_guard.
mutex|try_lock|bool try_lock()|Locks if it can do so without waiting.
unique_lock|unlock|void unlock()|Releases the mutex early.
unique_lock|lock|void lock()|Locks again.
unique_lock|owns_lock|bool owns_lock() const|Whether it currently holds the mutex.
condition_variable|wait|void wait(std::unique_lock<std::mutex>& lock, predicate)|Sleeps until notified and the predicate is true.
condition_variable|notify_one|void notify_one()|Wakes one waiting thread.
condition_variable|notify_all|void notify_all()|Wakes every waiting thread.
atomic|load|T load() const|Reads the value.
atomic|store|void store(T value)|Writes the value.
atomic|exchange|T exchange(T value)|Writes a value and returns the old one.
atomic|fetch_add|T fetch_add(T amount)|Adds and returns the old value.
atomic|fetch_sub|T fetch_sub(T amount)|Subtracts and returns the old value.
atomic|compare_exchange_weak|bool compare_exchange_weak(T& expected, T desired)|Stores desired only if the value equals expected.
atomic|compare_exchange_strong|bool compare_exchange_strong(T& expected, T desired)|Like the weak form, without spurious failures.
future|get|T get()|Waits for the result and returns it. Once only.
future|wait|void wait() const|Waits for the result.
future|valid|bool valid() const|Whether there is a result to get.
promise|set_value|void set_value(const T& value)|Delivers the result.
promise|get_future|std::future<T> get_future()|The future connected to this promise.
exception|what|const char* what() const|A message describing the error.
path|filename|path filename() const|The last part of the path.
path|stem|path stem() const|The file name without its extension.
path|extension|path extension() const|The extension, with its dot.
path|parent_path|path parent_path() const|Everything before the file name.
path|string|std::string string() const|The path as a string.
function|operator()|R operator()(Args... args) const|Calls the stored callable.
bitset|set|bitset& set(std::size_t position)|Switches a bit on.
bitset|reset|bitset& reset(std::size_t position)|Switches a bit off.
bitset|flip|bitset& flip(std::size_t position)|Toggles a bit.
bitset|test|bool test(std::size_t position) const|Whether a bit is on.
bitset|count|std::size_t count() const|How many bits are on.
bitset|to_string|std::string to_string() const|The bits as text.
stack|push|void push(const T& value)|Adds on top.
stack|pop|void pop()|Removes the top. Returns nothing.
stack|top|T& top()|The top element.
stack|size|std::size_t size() const|The number of elements.
stack|empty|bool empty() const|Whether it is empty.
queue|push|void push(const T& value)|Adds at the back.
queue|pop|void pop()|Removes the front. Returns nothing.
queue|front|T& front()|The oldest element.
queue|back|T& back()|The newest element.
queue|size|std::size_t size() const|The number of elements.
queue|empty|bool empty() const|Whether it is empty.
engine|seed|void seed(value)|Restarts the sequence from a seed.
span|subspan|span subspan(std::size_t offset, std::size_t count)|A view of part of the span.
span|first|span first(std::size_t count)|The first count elements.
span|last|span last(std::size_t count)|The last count elements.
`,d={vector:["vector","seq"],array:["array","seq"],deque:["deque","seq"],list:["list","seq"],span:["span","seq"],string:["string","seq"],string_view:["string_view","seq"],wstring:["string","seq"],map:["map","assoc"],unordered_map:["map","assoc"],multimap:["map","assoc"],set:["set","assoc"],unordered_set:["assoc"],multiset:["set","assoc"],pair:["pair"],optional:["optional"],variant:["variant"],expected:["optional"],unique_ptr:["unique_ptr","ptr"],shared_ptr:["shared_ptr","ptr"],weak_ptr:["weak_ptr"],ostream:["ostream","stream"],istream:["istream","stream"],ifstream:["file","istream","stream"],ofstream:["file","ostream","stream"],fstream:["file","istream","ostream","stream"],stringstream:["sstream","istream","ostream","stream"],istringstream:["sstream","istream","stream"],ostringstream:["sstream","ostream","stream"],thread:["thread"],jthread:["jthread","thread"],stop_token:["stop_token"],mutex:["mutex"],shared_mutex:["mutex"],unique_lock:["unique_lock"],condition_variable:["condition_variable"],atomic:["atomic"],future:["future"],promise:["promise"],exception:["exception"],runtime_error:["exception"],logic_error:["exception"],invalid_argument:["exception"],out_of_range:["exception"],path:["path"],function:["function"],bitset:["bitset"],stack:["stack"],queue:["queue"],priority_queue:["stack"],mt19937:["engine"]},_={cout:"ostream",cerr:"ostream",clog:"ostream",cin:"istream"},g=new Set(["front","back","at","top","value","get","operator[]"]),p=`
int|A whole number, usually 4 bytes: about -2.1 to +2.1 billion.|2.02
double|A number with a decimal point: about 15 significant digits. The default for decimals.|2.03
float|A decimal number with about 7 significant digits. Prefer double.|2.03
char|One character, stored as a small number.|2.04
bool|true or false.|2.04
void|"Nothing": a function that returns no value.|1.07
auto|Let the compiler work out the type from the initializer. Drops const and references.|4.07
const|This value will not change after it is set. The compiler enforces it.|2.06
constexpr|This value (or function result) can be worked out by the compiler, before the program runs.|2.06
consteval|This function must be evaluated by the compiler.|11.04
constinit|This static variable is initialized at compile time, but may change later.|11.04
static|On a local: keeps its value between calls. On a global: private to this file. In a class: shared by all objects.|3.06
inline|This definition may appear in several files; they are all the same one.|3.06
extern|This is defined in another file.|3.06
if|Runs a block only when a condition is true.|3.01
else|What to do when the if condition was false.|3.01
switch|Jumps to the case that matches one value.|3.02
case|A label inside a switch. Remember break.|3.02
default|Where a switch goes when no case matches. Also: ask the compiler to generate a special member (= default).|3.02
break|Leaves the nearest loop or switch.|3.03
continue|Skips to the next round of the loop.|3.03
for|A counting loop, or a loop over every element of a container.|3.03
while|Repeats while a condition is true. Tested before each round.|3.03
do|Starts a do-while loop: the body runs at least once.|3.03
return|Ends the function and hands a value back to the caller.|1.07
goto|Jumps to a label. Almost never the right tool.|3.08
struct|A type that bundles data. Members are public by default.|4.06
class|A type that bundles data with the functions that protect it. Members are private by default.|6.01
enum|A type with a fixed list of named values. Prefer enum class.|4.05
union|Several members sharing one piece of memory. Prefer std::variant.|13.02
namespace|A named group that keeps names from clashing.|3.05
using|Brings a name into scope, or gives a type another name.|4.07
typedef|The older way to give a type another name. Prefer using.|4.07
template|A pattern from which the compiler generates functions or classes for each type.|4.02
typename|Introduces a type parameter, or tells the compiler a dependent name is a type.|4.02
concept|A named requirement on template arguments.|9.04
requires|States a constraint on a template, or tests whether code would compile.|9.04
public|Usable by any code.|6.01
private|Usable only by the class's own member functions.|6.01
protected|Usable by the class and classes derived from it.|8.02
friend|Grants a function or class access to private members.|6.05
virtual|The version called is chosen by the object's real type, at run time.|8.03
override|Checks that this function really overrides a virtual one in the base class.|8.03
final|Nothing may override this function, or derive from this class.|8.03
explicit|This constructor or conversion must be asked for; it will not happen silently.|6.02
operator|Defines what an operator such as + or == means for your type.|6.07
this|A pointer to the object a member function was called on.|6.04
mutable|This member may change even in a const member function.|6.04
new|Allocates an object on the heap. Prefer std::make_unique.|7.02
delete|Releases an object made with new. Also: forbid a function (= delete).|7.02
nullptr|A pointer that points at nothing.|4.04
sizeof|The size of a type or object, in bytes.|2.01
alignof|The alignment a type requires.|13.02
alignas|Requests a stricter alignment.|13.02
decltype|The type of an expression.|4.07
static_cast|Converts on purpose between related types. Cuts off decimals; does not round.|2.05
dynamic_cast|Converts down a class hierarchy, checking at run time.|8.06
const_cast|Adds or removes const. Rarely justified.|2.05
reinterpret_cast|Treats bits as another type. Dangerous; prefer std::bit_cast.|13.01
try|Starts a block whose exceptions the following catch handlers may handle.|9.05
catch|Handles an exception of a matching type. Catch by const reference.|9.05
throw|Raises an exception. The current function stops at once.|9.05
noexcept|Promises that a function does not throw.|9.06
static_assert|A check done by the compiler. If it is false, the program does not build.|3.07
true|The bool value for "yes". Converts to 1.|2.04
false|The bool value for "no". Converts to 0.|2.04
unsigned|A whole number that cannot be negative. Wraps round at the ends.|2.02
signed|A whole number that can be negative. The default for int.|2.02
long|A larger whole number. long long is at least 64 bits.|2.02
short|A smaller whole number, usually 2 bytes.|2.02
co_yield|Hands out a value from a coroutine and pauses it.|12.07
co_await|Pauses a coroutine until an operation is ready.|12.07
co_return|Finishes a coroutine.|12.07
thread_local|Every thread gets its own copy of this variable.|12.01
volatile|Tells the compiler not to optimize away accesses. Not for threads: use std::atomic.|12.05
export|Makes a declaration visible to code that imports the module.|13.05
import|Brings in a module.|13.05
module|Declares which module this file belongs to.|13.05
`;function i(e){return e.split(`
`).map(t=>t.trim()).filter(Boolean).map(t=>t.split("|"))}const c=new Map;for(const[e,t,s,a,o]of i(h))c.set(e,{name:e,kind:t,header:s,signature:a,doc:o,ns:"std"});const l=new Map;for(const[e,t,s,a,o]of i(u))l.has(e)||l.set(e,new Map),l.get(e).set(t,{name:t,kind:s,signature:a,doc:o,ns:`std::${e}`,header:(c.get(e)||{}).header||e});const r=new Map;for(const[e,t,s,a]of i(m))r.has(e)||r.set(e,[]),r.get(e).push({name:t,signature:s,doc:a,isFunction:/\(/.test(s)});const f=new Map;for(const[e,t,s]of i(p))f.set(e,{doc:t,lesson:s});function b(e){const t=d[e];if(!t)return[];const s=new Set,a=[];for(const o of t)for(const n of r.get(o)||[])s.has(n.name)||(s.add(n.name),a.push(n));return a}function v(e){return!!d[e]}const y=[...new Set([...c.values()].map(e=>e.header)),"cassert","cstdio","ctime","climits","cfloat","compare","coroutine","memory_resource","numbers","ranges","regex","stop_token","version","typeinfo"].sort(),w=[...new Set(["seq","vector","string","assoc","map","pair","optional","ptr"].flatMap(e=>(r.get(e)||[]).map(t=>t.name)))];export{w as COMMON_MEMBERS,g as ELEMENT_MEMBERS,y as HEADERS,f as KEYWORDS,_ as OBJECT_TYPES,c as STD,l as SUB,v as isStdType,b as stdMembers};
