

#Stupid implementation 😩

command = 'montage'



files = String.new
last = 1
height = 7
width = 6
every = height*width



settings = "-size 500x500 -border 1 -tile #{width}x#{height} -geometry 250x250"


count = 1

loop do
  p "doing #{last} to #{last+every-1}"

  files = ''
  for i in (last..(last+every-1)) do
    break if i > 500
    files += "#{sprintf("%04d", i)}.svg "
  end
  last = i+1

  output = "output#{count}.png"

  exec = "#{command} #{settings} #{files} #{output}"

  p `#{exec}`

  exit if last >= 500

  count=count+1
end
