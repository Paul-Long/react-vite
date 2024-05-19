export function Search() {
  return (
    <div className="flex flex-row items-center w-full h-46px bg-gray-40 b-1px b-s-solid b-gray-40 b-rd-6px gap-8px font-light">
      <i className="iconfont font-size-20px text-gray-600 ml-16px">&#xe76e;</i>
      <input
        type="text"
        className="bg-transparent outline-none place-gray-600 font-size-16px text-#DEE4EE"
        placeholder="Search"
      />
    </div>
  );
}
