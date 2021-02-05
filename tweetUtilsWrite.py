# write into a file both destination and link coming from 2 separate files into ol>li html lines for twitter.html 
with open('urlutilities.txt', 'r') as ln:
    with open('utilitiesname.txt', 'r') as nm:
    	with open('results.txt', 'w') as wf:
    		for (a, b) in zip(ln, nm):
    			li = '<li><a href="{}" target="_blank">{}</a></li>\n'.format(a.strip(), b.strip())
    			wf.write(li)